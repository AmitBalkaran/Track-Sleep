from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SleepRecordViewSet

router = DefaultRouter()
router.register(r'sleep-records', SleepRecordViewSet, basename='sleeprecord')

urlpatterns = [
    path('', include(router.urls)),
]
