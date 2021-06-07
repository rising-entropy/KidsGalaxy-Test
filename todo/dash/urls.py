from .views import *
from django.urls import path, include

urlpatterns = [
    path('api/instances', InstancesAPI.as_view(), name='InstancesAPI'),
    path('api/instance/<int:id>', InstanceAPI.as_view(), name='InstanceAPI'),
]