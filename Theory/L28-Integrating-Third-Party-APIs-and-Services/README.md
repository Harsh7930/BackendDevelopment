# Lecture 28: Integrating Third-Party APIs and Services

**Unit:** 3 — Frameworks and Performance Optimization  
**Course outcome:** CO3 — Utilize frameworks and APIs to build backend applications

This runnable Django example adds an external-data endpoint to the Student Management API. It keeps HTTP-client work in `students/utils.py`, so the view only chooses the HTTP response.

## What it demonstrates

- Calls a third-party JSON API with `requests`.
- Sets a two-second timeout, so an unavailable dependency cannot hold a request forever.
- Converts timeout, network/HTTP, and invalid-JSON failures into a safe `503 Service Unavailable` response.
- Uses `unittest.mock` tests, so no real API call is made while testing.

## Run it

From this lecture folder:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cd student_system
python manage.py test students
python manage.py runserver
```

Then request `http://127.0.0.1:8000/api/students/external/1/`.

Example successful output (the live provider may include additional fields):

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit..."
}
```

When the external service cannot be reached, the endpoint returns:

```json
{"error": "External service is unavailable"}
```

with status `503`.

The root URL (`http://127.0.0.1:8000/`) serves the Lecture 28 HTML API Explorer. The JSON endpoint is `/api/students/external/1/`; `/api/students/external/1/view/` renders that data as HTML. If the root URL instead shows a JSON message naming Lecture 28, it is not the current app's home page—start the server from this lecture's `student_system` directory and reload.

## Structure

```text
student_system/
├── manage.py
├── student_system/       # Django configuration and root URLs
└── students/
    ├── urls.py           # /api/students/external/<post_id>/
    ├── views.py          # controlled JSON response
    ├── utils.py          # external HTTP service boundary
    └── tests.py          # mocked success and timeout cases
```
