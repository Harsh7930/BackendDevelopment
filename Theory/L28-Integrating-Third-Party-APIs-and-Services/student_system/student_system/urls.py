from django.urls import include, path

from students import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/students/", include("students.urls")),
]
