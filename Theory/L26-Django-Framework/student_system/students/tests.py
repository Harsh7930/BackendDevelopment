from django.test import TestCase


class IndexViewTests(TestCase):
    def test_index_returns_welcome_json(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/json")
        self.assertEqual(
            response.json(),
            {
                "message": "Welcome to the Student Management API",
                "version": "1.0",
                "status": "running",
            },
        )
