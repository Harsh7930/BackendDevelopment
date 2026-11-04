"""Service-layer utilities for external HTTP dependencies."""
import requests


EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts/{post_id}"
REQUEST_TIMEOUT_SECONDS = 2


def get_external_data(post_id):
    """Fetch one external post and normalize expected failure modes."""
    url = EXTERNAL_API_URL.format(post_id=post_id)

    try:
        response = requests.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
        response.raise_for_status()
        return {"data": response.json(), "error": None}
    except requests.Timeout:
        return {"data": None, "error": "External service timed out"}
    except requests.RequestException:
        return {"data": None, "error": "External service is unavailable"}
    except ValueError:
        return {"data": None, "error": "External service returned invalid JSON"}
