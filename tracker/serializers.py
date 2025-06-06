from rest_framework import serializers
from .models import SleepRecord

class SleepRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepRecord
        fields = ['id', 'user', 'date', 'hours']
        read_only_fields = ['user']