from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_GET

from .utils import get_external_data


def index(request):
    """Render the visual home page for the Lecture 28 demonstration."""
    return render(request, "students/index.html")


@require_GET
def external_data_view(request, post_id):
    """Return external data or a controlled service-unavailable response."""
    result = get_external_data(post_id)

    if result["error"]:
        return JsonResponse({"error": result["error"]}, status=503)

    return JsonResponse(result["data"])


@require_GET
def external_data_page_view(request, post_id):
    """Render third-party data in an HTML page for browser users."""
    result = get_external_data(post_id)
    return render(
        request,
        "students/external_data.html",
        {"post": result["data"], "error": result["error"], "post_id": post_id},
        status=503 if result["error"] else 200,
    )
