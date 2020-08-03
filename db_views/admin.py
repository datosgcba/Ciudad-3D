from django.contrib import admin
from .models import *

# Register your models here.
class VistaAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'sql', 'descripcion']
    readonly_fields = ('output_ex',)
    save_as=True



admin.site.register(Vista, VistaAdmin)
