from django.db import models


class Student(models.Model):
    """A small model used to demonstrate isolated database tests."""

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name
