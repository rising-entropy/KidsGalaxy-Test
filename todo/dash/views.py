from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
import json

class InstancesAPI(APIView):
    def get(self, request):
        try:
            allInstances = Instance.objects.filter()
            allList = []
            for instance in allInstances:
                allList.append({"id": instance.id, "task": instance.task})
            return Response(allList)
        except:
            return Response({"status": "500 Some Error Occurred"})
    
    def post(self, request):
        try:
            task = request.data['task']
            newTask = Instance(task=task)
            newTask.save()
            return Response({"status": "200 OK"})
        except:
            return Response({"status": "500 Some Error Occurred"})
        
class InstanceAPI(APIView):
    def get(self, request, id):
        try:
            thatInstance = Instance.objects.filter(id=id)[0]
            inst = {
                "id": id,
                "task": thatInstance.task
            }
            return Response(inst)
        except:
            return Response({"status": "500 Some Error Occurred"})
    
    def delete(self, request, id):
        try:
            Instance.objects.filter(id=id).delete()
            return Response({"status": "202 Accepted", "message": "task deleted successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})
        
    def put(self, request, id):
        try:
            task = request.data['task']
            Instance.objects.filter(id=id).update(task=task)
            return Response({"status": "202 Accepted", "message": "task updated successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})