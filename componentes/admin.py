from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Tarjeta, \
    Grafico_cartesiano, Indicador, Dona, Tarjeta_doble


class IndicadorResource(resources.ModelResource):
    class Meta:
        model = Indicador


class IndicadorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ['id', 'id_indicador', 'render']
    resource_class = IndicadorResource
    ordering = ['id_indicador']
    search_fields = ['id_indicador']
    readonly_fields = ('id_indicador', 'render')


admin.site.register(Indicador, IndicadorAdmin)


class TarjetaAdmin(admin.ModelAdmin):
    list_display = ['id', 'id_indicador', 'titulo', 'subtitulo', 'muestra', 'link_datos', 'view_asociada', 'color', 'grafico']
    ordering = ['id_indicador']
    search_fields = ['id_indicador']
    save_as=True


admin.site.register(Tarjeta, TarjetaAdmin)


class GraficoAdmin(admin.ModelAdmin):
    list_display = ['id', 'id_indicador', 'label_x', 'label_y', 'color1', 'color2', 'color3', 'leyendas', 'view_asociada', 'cant_distinto_color', 'color_columnas_revision']
    ordering = ['id_indicador']
    search_fields = ['id_indicador']


admin.site.register(Grafico_cartesiano, GraficoAdmin)


class DonaAdmin(admin.ModelAdmin):
    list_display = ['id', 'id_indicador', 'leyendas', 'view_asociada']
    ordering = ['id_indicador']
    search_fields = ['id_indicador']


admin.site.register(Dona, DonaAdmin)

class TarjetaDobleAdmin(admin.ModelAdmin):
    list_display = ['id', 'id_indicador', 'titulo', 'subtitulo1', 'subtitulo2', 'link_datos', 'view_asociada', 'color']
    ordering = ['id_indicador']
    search_fields = ['id_indicador']
    save_as=True

admin.site.register(Tarjeta_doble, TarjetaDobleAdmin)