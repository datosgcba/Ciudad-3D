import psycopg2
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django import forms
from django.core.cache import cache

import os
from db_views.helper import populateResponse


class Vista(models.Model):
    nombre = models.CharField(verbose_name='Nombre de Vista', max_length=256, null=False, blank=False,
                              help_text='Debe ser un nombre sin espacios, sera el que tomara la vista en la BD')
    nombre_anterior = models.CharField(
        verbose_name='Nombre de Vista', max_length=256, null=True, blank=True, editable=False)
    sql = models.TextField(verbose_name='Consulta SQL', max_length=8000, null=False,
                           blank=False, help_text='Respetar espacios, maximo de caracteres 8000')
    descripcion = models.TextField(
        verbose_name='Descripcion', max_length=512, null=False, blank=False)
    output_ex = models.CharField(verbose_name='Salida de Vista', help_text='Salida de vista actual',
                                 max_length=2048, null=False, blank=False, default='')

    class Meta:
        verbose_name = 'Vista de Bases de Datos'
        verbose_name_plural = 'Vistas de Bases de Datos'

    def __str__(self):
        return self.nombre

    def get_data(self, respuesta, tipo = None):
        data_conexion = settings.DATABASES['default']

        try:
            conexion = psycopg2.connect(
                host=data_conexion['HOST'],
                database=data_conexion['NAME'],
                user=data_conexion['USER'],
                password=data_conexion['PASSWORD'])
        except Exception as e:
            print(e)

        # Obtengo todos los registros de la vista
        sql = (f'select * from {self.nombre}')

        try:
            cursor = conexion.cursor()
            cursor.execute(sql)
            results = cursor.fetchall()

            populateResponse(respuesta, results, tipo)

        except Exception as e:
            print(e)
        finally:
            conexion.close()

        return respuesta

    def save(self, *args, **kwargs):

        data_conexion = settings.DATABASES['default']

        try:
            conexion = psycopg2.connect(
                host=data_conexion['HOST'],
                database=data_conexion['NAME'],
                user=data_conexion['USER'],
                password=data_conexion['PASSWORD'])
        except Exception as e:
            print(e)

        sql_create = (
            f'create or replace view {self.nombre} as ' + str(self.sql)).replace('\r\n', ' ')

        try:
            cursor = conexion.cursor()

            if not self._state.adding:
                sql_drop = f'drop view if exists {self.nombre_anterior};'
                cursor.execute(sql_drop)

            cursor.execute(sql_create)
            conexion.commit()

            cursor.execute(
                f"select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name = '{self.nombre}';")

            data_type_help = ''

            for row in cursor:
                data_type_help += 'Columna: ' + \
                    row[0] + ' Tipo: ' + row[1] + '\n'

            cursor.execute(f'select * from {self.nombre} limit 1;')

            data_type_help += '-'*30 + '\n'
            data_type_help += 'Ejemplo: \n' + str(cursor.fetchone())
            self.output_ex = data_type_help

            self.nombre_anterior = self.nombre
            super(Vista, self).save(*args, **kwargs)
            cache.clear()
        except SyntaxError as error_syntax:
            print(error_syntax)
        except Exception as e:
            raise e
        finally:
            conexion.close()

    def delete(self, *args, **kwargs):
        data_conexion = settings.DATABASES['default']

        conexion = psycopg2.connect(
            host=data_conexion['HOST'],
            database=data_conexion['NAME'],
            user=data_conexion['USER'],
            password=data_conexion['PASSWORD'])

        sql_drop = f'drop view if exists {self.nombre_anterior};'

        try:
            cursor = conexion.cursor()
            cursor.execute(sql_drop)
            conexion.commit()
            cache.clear()
        except Exception as e:
            print(e)
            conexion.close()

        conexion.close()

        super(Vista, self).delete(*args, **kwargs)
