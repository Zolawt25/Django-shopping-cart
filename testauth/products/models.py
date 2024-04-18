from django.db import models
# Create your models here.






class Product(models.Model):
    name = models.CharField(max_length=220)
    disc = models.TextField()
    price = models.FloatField()
    
    def __str__(self):
        return self.name
    