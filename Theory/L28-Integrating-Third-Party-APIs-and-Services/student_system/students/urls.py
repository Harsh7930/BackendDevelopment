from django.urls import path

from . import views

urlpatterns = [
    path("external/<int:post_id>/", views.external_data_view, name="external-data"),
    path("external/<int:post_id>/view/", views.external_data_page_view, name="external-data-page"),
]
