"""JSON endpoints used by the Lecture 29 tests."""
import logging

from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Student
from .utils import get_external_data

logger = logging.getLogger(__name__)


def serialize_student(student):
    return {"id": student.id, "name": student.name, "email": student.email}


@require_GET
def api_index(request):
    """Provide a useful response when the local development server is opened."""
    return JsonResponse(
        {
            "message": "Student Management API",
            "endpoints": {
                "health": "/api/health/",
                "students": "/api/students/",
                "student_detail": "/api/students/<student_id>/",
            },
        }
    )


@require_GET
def health_check(request):
    """A small endpoint whose stable 200 response is easy to test."""
    return JsonResponse({"status": "ok"})


@require_GET
def student_list(request):
    students = [serialize_student(student) for student in Student.objects.order_by("id")]
    return JsonResponse({"students": students})


@require_GET
def student_detail(request, student_id):
    """Return one student or a JSON 404; log the lookup without sensitive data."""
    logger.info("Looking up student_id=%s", student_id)
    try:
        student = Student.objects.get(pk=student_id)
    except Student.DoesNotExist:
        logger.warning("Student not found: student_id=%s", student_id)
        return JsonResponse({"error": "Student not found"}, status=404)

    return JsonResponse(serialize_student(student))


@require_GET
def external_student_data(request, student_id):
    """Return mocked-or-live external data with controlled dependency failures."""
    result = get_external_data(student_id)
    if result["error"]:
        logger.warning("External lookup failed for student_id=%s", student_id)
        return JsonResponse({"error": result["error"]}, status=503)
    return JsonResponse(result["data"])
