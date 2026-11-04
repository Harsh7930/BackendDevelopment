from unittest.mock import Mock, patch

import requests
from django.test import SimpleTestCase, TestCase
from django.urls import reverse

from .models import Student
from .utils import REQUEST_TIMEOUT_SECONDS, get_external_data


class StudentModelTests(TestCase):
    def test_student_can_be_saved_in_the_isolated_test_database(self):
        student = Student.objects.create(name="Aarav", email="aarav@example.com")

        self.assertEqual(Student.objects.count(), 1)
        self.assertEqual(str(student), "Aarav")


class StudentAPITests(TestCase):
    def setUp(self):
        self.student = Student.objects.create(name="Aarav", email="aarav@example.com")

    def test_health_endpoint_returns_ok_json(self):
        response = self.client.get(reverse("health-check"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_root_returns_api_index(self):
        response = self.client.get(reverse("api-index"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "Student Management API")

    def test_student_list_returns_created_students(self):
        response = self.client.get(reverse("student-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["students"], [{"id": self.student.id, "name": "Aarav", "email": "aarav@example.com"}])

    def test_student_detail_returns_the_requested_student(self):
        response = self.client.get(reverse("student-detail", kwargs={"student_id": self.student.id}))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], self.student.id)
        self.assertEqual(response.json()["name"], "Aarav")

    def test_unknown_student_returns_json_404(self):
        response = self.client.get(reverse("student-detail", kwargs={"student_id": 999}))

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"error": "Student not found"})


class ExternalServiceTests(SimpleTestCase):
    @patch("students.utils.requests.get")
    def test_success_returns_external_data(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = {"name": "Aarav"}
        mock_response.raise_for_status.return_value = None
        mock_get.return_value = mock_response

        result = get_external_data(1)

        self.assertEqual(result, {"data": {"name": "Aarav"}, "error": None})
        mock_get.assert_called_once_with(
            "https://jsonplaceholder.typicode.com/users/1", timeout=REQUEST_TIMEOUT_SECONDS
        )

    @patch("students.utils.requests.get", side_effect=requests.Timeout)
    def test_timeout_returns_a_safe_error(self, mock_get):
        result = get_external_data(1)

        self.assertEqual(result, {"data": None, "error": "External service timed out"})
        mock_get.assert_called_once()


class ExternalEndpointTests(SimpleTestCase):
    @patch("students.views.get_external_data")
    def test_external_dependency_failure_returns_503(self, mock_get_external_data):
        mock_get_external_data.return_value = {"data": None, "error": "External service timed out"}

        response = self.client.get(reverse("external-student-data", kwargs={"student_id": 1}))

        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), {"error": "External service timed out"})
