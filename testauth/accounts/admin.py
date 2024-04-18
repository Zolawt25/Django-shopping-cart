from django.contrib import admin
from .models import CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.



class CustomUserAdmin(UserAdmin):
    
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    model = CustomUser
    list_display = [
        "email",
        "name",
        "sex",
        "is_staff",
        "is_active",
    ]
    list_filter = [
        "email",
        "name",
        "sex",
        "is_staff",
        "is_active",
    ]
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("name", "sex", "is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "name",
                "sex", "is_staff", "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(CustomUser, CustomUserAdmin)