from django.db import models

# Create your models here.
class Instance(models.Model):
    task = models.CharField(max_length=10000, default='')
    
    def __str__(self):
        return self.task