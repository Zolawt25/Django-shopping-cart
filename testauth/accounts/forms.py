from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from allauth.account.forms import SignupForm 
from django import forms 




class CustomSignupForm(SignupForm): 
	name = forms.IntegerField(label='name') 
	sex = forms.CharField(label='name') 

	def save(self, request):
		user = super(CustomSignupForm, self).save(request)
		
		name = self.cleaned_data['name']
		sex = self.cleaned_data['sex']
		
		user.name = name
		user.sex = sex

		user.save()
		return user





class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ("email", "name", "sex",)
        
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ("email", "name", "sex",)