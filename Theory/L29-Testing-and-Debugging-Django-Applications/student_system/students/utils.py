"""Boundary for an external dependency; tests mock this module's HTTP call."""
import requests


EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/users/{student_id}"
REQUEST_TIMEOUT_SECONDS = 2


def get_external_data(student_id):
    """Fetch external data and return one predictable result shape."""
    try:
        response = requests.get(
            EXTERNAL_API_URL.format(student_id=student_id),
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
        return {"data": response.json(), "error": None}
    except requests.Timeout:
        return {"data": None, "error": "External service timed out"}
    except requests.RequestException:
        return {"data": None, "error": "External service is unavailable"}
    except ValueError:
        return {"data": None, "error": "External service returned invalid JSON"}
