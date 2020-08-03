from datetime import datetime, timedelta, date
from django.db import models
from django.apps import apps
from colorfield.fields import ColorField
import inspect
from django.core.exceptions import ObjectDoesNotExist
from django.core.cache import cache

# Create your models here.
from django.db.models import Sum, Avg
from django.shortcuts import render

from db_views.models import Vista


def datasets():
    DATASETS = []
    modelos = apps.get_app_config('datasets').models
    for modelo in modelos:
        DATASETS.append((modelo, modelo))
    return DATASETS


FUNCIONES_DATASETS = [
    ('total_por', 'Totalizar por un campo'),
    ('promedio_por', 'Promediar por un campo')
]

FUNCIONES_DATASETS_GRAFICOS = [
    ('total_grafico_historico_por', 'Totalizar por un campo'),
]


def funciones_de_graficos_agrupacion_datasets():
    FUNCIONES = []
    for elem in inspect.getmembers(apps.get_app_config('datasets').models['dataset']):
        if elem[0][-3:] == 'por' and 'grafico' in elem[0]:
            funcion = elem[0]
            FUNCIONES.append((funcion, funcion))
    return FUNCIONES


class Indicador(models.Model):
    id_indicador = models.CharField(verbose_name='Id Indicador', max_length=256, null=False, blank=False, default='')
    render = models.CharField(max_length=256, null=True, blank=True)

    class Meta:
        verbose_name = 'Indicador'
        verbose_name_plural = 'Indicadores'

    def __str__(self):
        return self.id_indicador


class Componente(models.Model):
    id_indicador = models.CharField(verbose_name='Id Indicador', max_length=256, null=False, blank=False, default='')
    id_indicador_bk = models.CharField(verbose_name='Id Indicador Bk', max_length=256, null=False, blank=False, default='', editable=False)
    view_asociada = models.ForeignKey(Vista, verbose_name='Vista Asociada', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.id_indicador

    def delete(self,  *args, **kwargs):
        try:
            Indicador.objects.filter(id_indicador=self.id_indicador).delete()
            cache.clear()
        except ObjectDoesNotExist:
            pass

        super(Componente, self).delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        try:
            if self._state.adding:
                Indicador.objects.get(id_indicador=self.id_indicador)
                raise ValueError('El nombre del indicador ya se encuentra reservado')
            else:
                cache.clear()
                if self.id_indicador != self.id_indicador_bk:
                    indicador = Indicador.objects.get(id_indicador=self.id_indicador_bk)
                    self.id_indicador_bk = self.id_indicador
                    try:
                        Indicador.objects.get(id_indicador=self.id_indicador)
                        raise ValueError('El nombre del indicador ya se encuentra reservado')
                    except ObjectDoesNotExist:
                        indicador.id_indicador = self.id_indicador

                    indicador.save()

        except ObjectDoesNotExist:
            self.id_indicador_bk = self.id_indicador
            indicador = Indicador(
                id_indicador=self.id_indicador,
                render=self._meta.model_name
            )

            indicador.save()

        except ValueError as e:
            raise e

        super(Componente, self).save(*args, **kwargs)


class Tarjeta(Componente):
    titulo = models.CharField(verbose_name='Titulo', max_length=256, null=False, blank=False, default='')
    subtitulo = models.CharField(verbose_name='Subtitulo', max_length=256, null=True, blank=True)
    comentarios = models.TextField(verbose_name='Comentarios', max_length=256, null=True, blank=True)
    muestra = models.IntegerField(verbose_name='Muestra', null=True, blank=False, default=15)
    link_datos = models.URLField(verbose_name='Link a datos', max_length=200, null=True, blank=True)
    grafico = models.BooleanField(verbose_name='Mostrar Grafico', default=True, null=False, blank=False, help_text= 'Si se desea mostrar el grafico de tendencia. No aplica para datos unicos')
    acumular = models.BooleanField(verbose_name='Mostrar datos acumulados', default=False, null=False, blank=False,
                                   help_text='Si se desea mostrar la serie de datos acumulados.')
    color = ColorField(default='#ffc107', help_text='Color de Tarjeta')


    def renderizar(self, request):

        respuesta = {
            'titulo': self.titulo,
            'subtitulo': self.subtitulo,
            'muestra': self.muestra,
            'link_datos': self.link_datos,
            'grafico': self.grafico,
            'acumulado': self.acumular,
            'color': self.color,
            'comentarios': self.comentarios
        }

        respuesta = self.view_asociada.get_data(respuesta)

        # respuesta = self.get_dataset_asociado().get_data(respuesta, self.filtros_de_consulta)

        return render(request, 'tarjeta/index.html', respuesta)

class Tarjeta_doble(Componente):
    titulo = models.CharField(verbose_name='Titulo', max_length=256, null=False, blank=False, default='')
    subtitulo1 = models.CharField(verbose_name='Subtitulo1', max_length=256, null=False, blank=False, help_text='Subtitulo del primer dato')
    subtitulo2 = models.CharField(verbose_name='Subtitulo2', max_length=256, null=False, blank=False, help_text='Subtitulo del segundo dato')
    color = ColorField(default='#ffc107', help_text='Color de Tarjeta')
    link_datos = models.URLField(verbose_name='Link a datos', max_length=200, null=True, blank=True)
    
    class Meta:
        verbose_name = 'Tarjeta Doble'
        verbose_name_plural = 'Tarjetas Dobles'

    def renderizar(self, request):

        respuesta = {
            'titulo': self.titulo,
            'subtitulo1': self.subtitulo1,
            'subtitulo2': self.subtitulo2,
            'color': self.color,
            'link_datos': self.link_datos
        }

        respuesta = self.view_asociada.get_data(respuesta,'tarjeta_doble')

        return render(request, 'tarjeta_doble/index.html', respuesta)


class Dona(Componente):
    leyendas = models.CharField(verbose_name='Leyenda', max_length=256, null=False, blank=False, default='', help_text='Acepta las leyendas separas por coma, tiene sentido en graficos de varias series')

    def renderizar(self, request):
        respuesta = {
            'leyendas': str(self.leyendas).split(',')
        }

        respuesta = self.view_asociada.get_data(respuesta)

        respuesta['suma'] = sum(respuesta['datos_y'])
        respuesta['isMobile'] = True if request.GET.get('mobile', '') else False

        return render(request, 'grafico_dona/index.html', respuesta)


class Grafico_cartesiano(Componente):
    label_x = models.CharField(verbose_name='Label Eje X', max_length=256, null=False, blank=False, default='')
    label_y = models.CharField(verbose_name='Label Eje Y', max_length=256, null=False, blank=False, default='')
    color1 = ColorField(default='#fdd306', help_text='Se muestra debajo de todo')
    color2 = ColorField(default='#037dbf', help_text='Se muestra en el medio')
    color3 = ColorField(default='#e74c3c', help_text='Se muestra por encima de todo')
    leyendas = models.CharField(verbose_name='Leyenda', max_length=256, null=False, blank=False, default='', help_text='Acepta las leyendas separas por coma, tiene sentido en graficos de varias series')
    tipo_grafico = models.CharField(verbose_name='Tipo de Grafico', max_length=256, null=False,
                                    blank=False, default='', help_text='Acepta line, bar separadas por coma. Ej: line,bar (grafico de linea y barras)')
    cant_distinto_color = models.IntegerField(verbose_name='Cantidad de columnas en revision', null=True, blank=True, help_text='Se mostraran en otro color, segun lo indicado en el campo color_columnas_revision')
    color_columnas_revision = ColorField(verbose_name='Color Columnas Revision', default='#717170')

    def renderizar(self, request):

        respuesta = {
            'label_x': self.label_x,
            'label_y': self.label_y.split(','),
            'color1': [self.color1],
            'color2': self.color2,
            'color3': self.color3,
            'leyendas': str(self.leyendas).split(','),
            'tipo_grafico': str(self.tipo_grafico).replace(' ', '').split(',')
        }

        respuesta = self.view_asociada.get_data(respuesta)

        if self.cant_distinto_color:
            respuesta['color1'] = [self.color1 for i in range(len(respuesta['datos_x']) - self.cant_distinto_color)]
            for i in range(self.cant_distinto_color):
                respuesta['color1'].append(self.color_columnas_revision)

        respuesta['cant_datos'] = [0 for i in range(len(respuesta['datos_x']) - 1)]

        return render(request, 'grafico/index_simple.html' if 'datos_y2' not in respuesta else 'grafico/index_multiple.html', respuesta)