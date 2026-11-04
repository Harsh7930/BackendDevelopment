from unittest.mock import Mock, patch

import requests
from django.test import SimpleTestCase

from .utils import REQUEST_TIMEOUT_SECONDS, get_external_data


class ExternalDataServiceTests(SimpleTestCase):
    @patch("students.utils.requests.get")
    def test_external_data_success(self, mock_get):
        mock_response = Mock()
        mock_response.json.return_value = {"id": 1, "title": "Example"}
        mock_response.raise_for_status.return_value = None
        mock_get.return_value = mock_response

        result = get_external_data(1)

        self.assertEqual(result, {"data": {"id": 1, "title": "Example"}, "error": None})
        mock_get.assert_called_once_with(
            "https://jsonplaceholder.typicode.com/posts/1",
            timeout=REQUEST_TIMEOUT_SECONDS,
        )

    @patch("students.utils.requests.get", side_effect=requests.Timeout)
    def test_external_data_timeout(self, mock_get):
        result = get_external_data(1)

        self.assertEqual(result, {"data": None, "error": "External service timed out"})
        mock_get.assert_called_once()


class ExternalDataViewTests(SimpleTestCase):
    def test_index_renders_website_home_page(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Third-Party API Explorer")

    @patch("students.views.get_external_data")
    def test_page_renders_external_data_as_html(self, mock_get_external_data):
        mock_get_external_data.return_value = {
            "data": {"id": 1, "userId": 1, "title": "Example title", "body": "Example body"},
            "error": None,
        }

        response = self.client.get("/api/students/external/1/view/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Example title")

    @patch("students.views.get_external_data")
    def test_view_returns_503_for_service_failure(self, mock_get_external_data):
        mock_get_external_data.return_value = {
            "data": None,
            "error": "External service is unavailable",
        }

        response = self.client.get("/api/students/external/1/")

        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), {"error": "External service is unavailable"})
