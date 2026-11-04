from django.contrib import admin
from django.urls import include, path

from students import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.api_index, name="api-index"),
    path("api/", include("students.urls")),
]
