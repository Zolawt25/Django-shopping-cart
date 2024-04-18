from rest_framework import serializers
from allauth.utils import (email_address_exists,
                               get_username_max_length)
from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

class CustomRegisterSerializer(serializers.Serializer):
    
    name = serializers.CharField()
    sex = serializers.CharField()
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    ("A user is already registered with this e-mail address."))
        return email

    
    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(("The two password fields didn't match."))
        return data

    def custom_signup(self, request, user):
        pass

    def get_cleaned_data(self):
        return {
            # 'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'name': self.validated_data.get('name', ''),
            'sex': self.validated_data.get('sex', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.name = self.cleaned_data.get('name')
        user.sex = self.cleaned_data.get('sex')
        # user.date_of_birth = self.cleaned_data.get('date_of_birth')
        user.save()
        adapter.save_user(request, user, self)
        return user
    # def save(self, request):
    #     adapter = get_adapter()
    #     user = adapter.new_user(request)
    #     self.cleaned_data = self.get_cleaned_data()
    #     adapter.save_user(request, user, self)
    #     self.custom_signup(request, user)
    #     setup_user_email(request, user, [])
    #     return user


# from rest_framework import serializers
# # from rest_auth.registration.serializers import RegisterSerializer
# from .models import CustomUser

# class CustomRegisterSerializer(RegisterSerializer):
#     # age = serializers.IntegerField(max_value=None, min_value=1)
#     name = serializers.CharField(max_length=100)
#     sex = serializers.CharField(max_length=50)
#     # date_of_birth = serializers.DateField()

#     class Meta:
#         model = CustomUser
        
#         fields = ('email', 'password', "name", "sex",)