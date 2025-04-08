from rest_framework import viewsets, permissions
from .models import SleepRecord
from .serializers import SleepRecordSerializer
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework.authentication import SessionAuthentication

class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        # Simply do not perform the CSRF check.
        return

def home_view(request):
    return HttpResponse("Welcome to the Sleep Tracker API Homepage!")

class SleepRecordViewSet(viewsets.ModelViewSet):
    serializer_class = SleepRecordSerializer
    # Use the CSRF-exempt session authentication to bypass CSRF validation
    authentication_classes = [CsrfExemptSessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return sleep records for the authenticated user.
        return SleepRecord.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
