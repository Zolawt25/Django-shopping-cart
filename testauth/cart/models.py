from django.db import models
# Create your models here.






class Cart(models.Model):
    productId = models.IntegerField()
    useremail = models.EmailField(max_length=254, null=True)
    name = models.CharField(max_length=220)
    disc = models.TextField()
    price = models.FloatField()
    
    def __str__(self):
        return self.name
    