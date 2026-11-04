# Lecture 26: Django Framework

**Topic:** Django Framework: Overview, Architecture, and Setup  
**Unit:** 3 — Frameworks and Performance Optimization  
**Course Outcome:** CO3 — Utilize frameworks and APIs to build backend applications  
**Bloom's level:** Understand

### Lecture plan

| Item | Details |
| --- | --- |
| Lecture | 26 |
| Unit | Unit 3 — Frameworks and Performance Optimization |
| Topic | Django Framework: Detailed Overview, Architecture, and Setup |
| Course outcome | CO3 — Utilize frameworks and APIs |
| Skills | Django installation, virtual environments, and project/app setup |
| Activity | Set up the Student Management API project structure with Django |
| Assessment | Coding task |

## Learning objectives

By the end of this lecture, you should be able to:

- Explain what Django is and identify its built-in features.
- Describe the Model–View–Template (MVT) architecture and the request lifecycle.
- Compare MVT with MVC and identify other common architectural patterns.
- Distinguish a Django project from a Django app.
- Explain the roles of WSGI and ASGI.
- Create a Django project and app, configure the app, and return a JSON response.

## Contents

- [Part A — Theory](#part-a--theory)
- [Part B — Installation and setup](#part-b--installation-and-setup)
- [Part C — Hands-on](#part-c--hands-on-return-json-from-a-view)
- [Summary](#summary)

## Part A — Theory

### 1. Introduction to Django

Django is a high-level Python web framework for building web applications quickly, securely, and with less repetitive code. Its tagline, **“The web framework for perfectionists with deadlines,”** reflects its goal of handling routine web-development work so developers can focus on application behavior.

Django is often called **batteries-included** because it provides common web-development features as part of the framework:

- **Object-relational mapper (ORM):** work with database records through Python models instead of writing SQL for every operation.
- **Admin site:** manage registered model data through an administrative interface.
- **Authentication and authorization:** use built-in users, groups, and permissions.
- **URL routing:** map readable URL patterns to application logic.
- **Template engine:** render dynamic server-side HTML.
- **Security protections:** built-in defenses for common risks, including CSRF, XSS, SQL injection, and clickjacking.
- **Forms and validation**
- **Internationalization (i18n) and localization (l10n)**
- **Caching and testing tools**

Django was developed for the *Lawrence Journal-World* newspaper, released publicly in 2005, and is maintained by the Django Software Foundation (DSF). It is used by organizations including Instagram, Pinterest, Mozilla, and Disqus.

### 2. Why use a web framework?

Without a framework, developers would need to repeatedly build infrastructure for tasks such as parsing HTTP requests, connecting to databases, handling sessions and cookies, and organizing application code. They would also need to account for common security risks.

A framework supplies reusable components, conventions, and structure. Django lets developers focus more on application behavior while using established tools for common web-development work.

### 3. Django's MVT architecture

Django uses **Model–View–Template (MVT)**, a pattern related to the classic Model–View–Controller (MVC) pattern.

| MVT component | Responsibility |
| --- | --- |
| **Model** | Defines data structures and database behavior. Django's ORM maps Python model classes to database tables. |
| **View** | Handles a request, runs application logic, may retrieve or update model data, and returns a response. |
| **Template** | Defines presentation, usually HTML, and renders data supplied by a view. |

An API-only view may return JSON directly and may not need a template.

#### Request lifecycle

```text
Client → URL dispatcher → View ↔ Model ↔ Database
                              ↓
                         Template (optional)
                              ↓
                       HTTP response → Client
```

1. A browser or API client sends an HTTP request to a URL.
2. Django's URL dispatcher matches the URL pattern in `urls.py` to a view.
3. The view runs application logic and may query or update a model.
4. A model uses the ORM to interact with the database.
5. The view may pass data to a template to render HTML.
6. The view returns an HTTP response, such as HTML, JSON, or a redirect.

#### MVC compared with MVT

The classic **Model–View–Controller (MVC)** pattern, used in frameworks such as Ruby on Rails, Laravel, and Spring MVC, separates an application into three responsibilities:

| MVC component | Responsibility |
| --- | --- |
| **Model** | Holds data and business rules. |
| **View** | Presents information to the user. |
| **Controller** | Handles input and coordinates the model and view. |

The high-level MVC flow is **User → Controller → Model → View → User**. Django uses similar separation but names its responsibilities differently:

| Django MVT | Closest MVC role | Responsibility |
| --- | --- | --- |
| Model | Model | Data structures and database access |
| View | Controller | Request handling and application logic |
| Template | View | Presentation |
| URL dispatcher | Router | Maps URLs to views |

The names are easy to confuse: Django's **view** is closest to the MVC **controller**, while Django's **template** is closest to the MVC **view**.

#### MVT, MVC, MVP, and MVVM at a glance

| Aspect | MVC | MVT (Django) | MVP | MVVM |
| --- | --- | --- | --- | --- |
| Full name | Model–View–Controller | Model–View–Template | Model–View–Presenter | Model–View–ViewModel |
| Input or coordination | Controller | View | Presenter | ViewModel |
| Presentation | View | Template | View | View |
| Typical association | Rails, Laravel, Spring MVC | Django | Older Android applications | Angular, Vue, WPF |
| Data binding | Usually explicit | Usually explicit | Usually explicit | Often supports two-way binding |

#### Other architectural patterns

- **MVC (Model–View–Controller):** separates data, presentation, and input handling.
- **MVP (Model–View–Presenter):** a presenter coordinates the model and a comparatively passive view.
- **MVVM (Model–View–ViewModel):** a view model connects presentation and data, often with data binding.
- **REST (Representational State Transfer):** an architectural style for network APIs. Django REST Framework is a separate toolkit commonly used to build REST APIs with Django.
- **Layered architecture:** separates concerns such as presentation, business logic, persistence, and database access.
- **Microservices:** structures a system as independently deployable services; Django can be used to build an individual service.
- **Serverless:** runs application code in managed functions; Django can be adapted to some serverless platforms.

#### Why Django uses MVT

- **Separation of concerns:** data, request handling, and presentation have distinct responsibilities.
- **Reusability:** templates can be reused across views, and apps/models can be reused across projects.
- **Testability:** views and models can be tested as separate parts of an application.
- **DRY principle:** “Don't Repeat Yourself.” Django conventions and reusable components reduce repeated code.

### 4. Django project structure

Create a project with `django-admin startproject student_system`. Django generates a structure like this:

```text
student_system/
├── manage.py
└── student_system/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py
```

| File | Purpose |
| --- | --- |
| `manage.py` | Runs project-management commands such as `runserver`, `migrate`, and `startapp`. |
| `__init__.py` | Marks the directory as a Python package. |
| `settings.py` | Holds project configuration, including installed apps, database, middleware, templates, and static files. |
| `urls.py` | Defines the project's root URL routes. |
| `asgi.py` | ASGI application entry point for deployment servers. |
| `wsgi.py` | WSGI application entry point for deployment servers. |

An app created with `python manage.py startapp students` has a structure similar to:

```text
students/
├── migrations/
│   └── __init__.py
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

#### Project versus app

| Concept | Project | App |
| --- | --- | --- |
| Meaning | The complete Django website or service | A module that provides a particular feature |
| Created with | `django-admin startproject` | `python manage.py startapp` |
| Typically contains | Global configuration and root URLs | Feature-specific models, views, tests, and migrations |
| Count | Usually one project for a deployed application | One project may contain many apps |
| Reuse | Organizes the full application | Apps can be reusable across projects |

For example, a university website could be one project with separate `students`, `courses`, and `faculty` apps.

#### WSGI and ASGI

| Feature | WSGI | ASGI |
| --- | --- | --- |
| Full name | Web Server Gateway Interface | Asynchronous Server Gateway Interface |
| Interface style | Synchronous | Supports synchronous and asynchronous applications |
| Django use | Traditional synchronous deployment | Asynchronous views and protocols such as WebSockets |
| Example servers | Gunicorn, uWSGI | Uvicorn, Daphne |

ASGI is a natural choice for applications that need asynchronous request handling or long-lived connections such as WebSockets. Django also supports asynchronous views under WSGI, but ASGI is generally better suited to async workloads.

## Part B — Installation and setup

### 1. Create and activate a virtual environment

Run these commands from the `Theory/L26-Django-Framework` directory:

```powershell
python -m venv venv
venv\Scripts\activate
```

If you use PowerShell and script activation is enabled, you can also run `.\venv\Scripts\Activate.ps1`. On macOS or Linux, create and activate the environment with:

```bash
python3 -m venv venv
source venv/bin/activate
```

A virtual environment isolates the project's Python dependencies from other projects.

### 2. Install Django

With the virtual environment active, install Django:

```bash
python -m pip install django
```

Alternatively, install the Django version range specified for this lecture:

```bash
python -m pip install -r requirements.txt
```

Verify the installed Django version:

```bash
python -m django --version
```

### 3. Create a project and app

For a fresh setup, run these commands from an empty working directory. The first command creates the `student_system` project folder; the second enters it; the third creates the `students` app inside it:

```bash
django-admin startproject student_system
cd student_system
python manage.py startapp students
```

> **Already using the included example?** The runnable project is in this lecture folder, so do not run `startproject` over it. Change to its existing `student_system` directory before running the server or tests.

### 4. Register the app

In `student_system/settings.py`, register the new app in `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "students",
]
```

### 5. Start the development server

From the lecture directory, change into the project folder and start the server:

```powershell
cd student_system
python manage.py runserver
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in a browser. Django's development server is for local development, not production deployment.

### Common `manage.py` commands

| Command | Purpose |
| --- | --- |
| `runserver` | Starts the local development server, usually on port 8000. |
| `startapp` | Creates a Django app structure. |
| `makemigrations` | Creates migration files based on model changes. |
| `migrate` | Applies migrations to the database. |
| `createsuperuser` | Creates an administrator account. |
| `shell` | Opens an interactive Python shell configured for the project. |
| `check` | Checks the project for common configuration problems. |
| `collectstatic` | Collects static files for deployment. |
| `test` | Runs the project's tests. |
| `dbshell` | Opens the configured database's command-line client, when available. |

## Part C — Hands-on: return JSON from a view

The steps below show how to evolve a simple text response into JSON. The included runnable project is already at the final JSON step: its root URL returns the JSON response shown below.

### 1. Create a basic text view

In `student_system/students/views.py`, create a view that accepts the request and returns an HTTP response:

```python
from django.http import HttpResponse


def index(request):
    return HttpResponse("Welcome to the Student Management API (Django)")
```

### 2. Map the root URL to the view

In `student_system/student_system/urls.py`, map the root URL to the view:

```python
from django.contrib import admin
from django.urls import path

from students import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index),
]
```

### 3. Return JSON instead of plain text

For an API response, update `students/views.py` to use Django's `JsonResponse`:

```python
from django.http import JsonResponse


def index(request):
    return JsonResponse(
        {
            "message": "Welcome to the Student Management API",
            "version": "1.0",
            "status": "running",
        }
    )
```

### 4. Run and verify

From the lecture directory, enter the project folder and start the development server:

```bash
cd student_system
python manage.py runserver
```

Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/). The response should be JSON:

```json
{
  "message": "Welcome to the Student Management API",
  "version": "1.0",
  "status": "running"
}
```

This example returns JSON using Django's built-in `JsonResponse`; it demonstrates a simple endpoint, not a full REST API or Django REST Framework application.

The included project test verifies the JSON response shown above. If you follow the text-response step first, update the view to JSON before running the test.

### 5. Run the test

```bash
cd student_system
python manage.py test students
```

## Summary

- Django is a batteries-included Python web framework.
- Django organizes web applications around MVT: Model, View, and Template.
- In an API-only view, JSON can be returned directly without a template.
- A project contains overall configuration; apps organize reusable features.
- WSGI and ASGI are interfaces between a Django application and its server; ASGI supports asynchronous workloads and protocols such as WebSockets.
- `manage.py` provides the command-line interface for common Django tasks.

### Next lecture

**Lecture 27 — Working with Middleware in Django.** Middleware processes requests and responses across the application and is commonly used for authentication, logging, CORS, and security.

### Source

[Lecture 26: Django Framework](https://upessocs.github.io/Lectures/Backend%20Development/Theory/Unit%203/L26%20Django%20Framework.md)
