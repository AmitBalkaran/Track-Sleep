from django.db import models
from django.contrib.auth.models import User

class SleepRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sleep_records')
    date = models.DateField()
    hours = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.date}: {self.hours} hours"
