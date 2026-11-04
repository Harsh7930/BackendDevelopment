# Lecture 29: Testing and Debugging Django Applications

**Unit:** 3 — Frameworks and Performance Optimization  
**Course outcome:** CO4 — Apply security best practices and conduct testing  
**Bloom's level:** Analyze

This lecture contains a small, runnable Student Management API designed to make testing concrete. It demonstrates endpoint tests, database tests, mock-based tests for an external dependency, and logging that helps diagnose a failed request without leaking sensitive data.

## Learning objectives

By the end of the lecture, you should be able to:

- explain how automated tests prevent regressions;
- distinguish unit, integration, model, and endpoint tests;
- test JSON responses with Django's test client and named URLs;
- use Django's isolated test database confidently;
- mock an external HTTP dependency instead of calling the network in a test; and
- use assertion failures, tracebacks, and logs to diagnose defects.

## Project structure

```text
student_system/
├── manage.py
├── student_system/            # settings and root URL configuration
└── students/
    ├── models.py              # Student model
    ├── views.py               # JSON API endpoints and safe logging
    ├── urls.py                # named routes used by reverse()
    ├── utils.py               # external-service boundary
    ├── tests.py               # model, endpoint, and mocked-service tests
    └── migrations/            # initial Student migration
```

## Setup and run

From this lecture folder in PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cd student_system
python manage.py migrate
python manage.py test
python manage.py runserver
```

The application then exposes the following routes:

| Route | Name | Expected response |
| --- | --- | --- |
| `GET /api/health/` | `health-check` | `200` and `{"status": "ok"}` |
| `GET /api/students/` | `student-list` | `200` and a `students` array |
| `GET /api/students/<student_id>/` | `student-detail` | `200` and one student, or `404` |
| `GET /api/students/external/<student_id>/` | `external-student-data` | data from a service, or a controlled `503` |

Opening `http://127.0.0.1:8000/` returns an API index with these endpoint paths.

The list is empty until records are created. The tests create their own records, so they never depend on your local `db.sqlite3` data.

## Test the application

```powershell
# All tests in this app
python manage.py test students

# Detailed test names
python manage.py test -v 2

# A focused failing test while debugging
python manage.py test students.tests.StudentAPITests.test_health_endpoint_returns_ok_json

# Stop after the first failure
python manage.py test --failfast
```

`TestCase` creates a temporary database and removes it after the run. Use it for models and database-backed views. `SimpleTestCase` does not permit database access, so it clearly communicates that the external-service tests are isolated and do not need a database.

### What the tests cover

- `StudentModelTests`: creates a model record in Django's temporary test database.
- `StudentAPITests`: uses the Django test client and `reverse()` to verify health, list, detail, and JSON 404 behavior.
- `ExternalServiceTests`: patches `students.utils.requests.get`, covering both successful data and a timeout without making a real request.
- `ExternalEndpointTests`: verifies that a dependency failure is converted into a safe `503 Service Unavailable` response.

The mock target is intentionally `students.utils.requests.get`: patch the name where the production code looks it up. Patching `requests.get` somewhere else can accidentally leave the real network call active.

## Debugging exercise

1. In `students/views.py`, temporarily change the status code in `health_check` from its default `200` to `201`.
2. Run the focused health test above.
3. Read the final assertion: it shows the expected and actual status codes.
4. Restore the view's `200` behavior, run the focused test again, then run the full suite.

Do not change the test merely to make it green—the test represents the required API contract. Start with the failing assertion, then work backward through the traceback to the first relevant application line.

## Logging and safe debugging

`student_detail` logs the requested numeric ID and logs a warning for a missing record. The project directs the `students` logger to the console, so these messages are visible during local development and test runs.

Use logs to record useful decisions and context, not secrets. Never log passwords, tokens, session cookies, authentication headers, or unnecessary personal information. Django Debug Toolbar can help investigate queries and timings locally, but it must remain disabled on public production traffic.

## Testing workflow

```text
Write expected behavior → run a focused test → read failure and traceback
        ↑                                             ↓
run the complete suite ← fix the relevant code ← inspect logs / request path
```

## PBL activity

Extend the example by adding tests for an empty student list, duplicate-email validation, and an external HTTP error. Before writing each test, inspect the URL name, response format, and model field it exercises. Every test should create its own data and assert both the HTTP status and meaningful response content.

## Summary

Automated tests document behavior and protect it from regressions. Django's test client verifies HTTP behavior without starting a live server; `TestCase` isolates database work; and mocks make external-service tests fast, repeatable, and offline. When a test fails, the failure message, traceback, and carefully chosen logs provide evidence for the fix.

### Next lecture

**Lecture 30 — Security, Authentication, and Authorization in Django.**
