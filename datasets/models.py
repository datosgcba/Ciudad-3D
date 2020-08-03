from django.contrib.gis.db import models
from datetime import timedelta
import inspect

from django.db.models import Count, Sum, Avg


class Dataset(models.Model):
    pass

    class Meta:
        abstract = True

    @classmethod
    def get_data(cls, respuesta, filtros_de_consulta=False):
        query = 'cls._meta.model.objects.values()'

        if filtros_de_consulta:
            query += filtros_de_consulta

        if 'muestra' in respuesta:
            end_date = cls._meta.model.objects \
                                   .values('fecha') \
                                   .order_by('fecha') \
                                   .reverse()[:1][0]['fecha']

            start_date = end_date - timedelta(days=int(str(respuesta['muestra'])))

            filtro_fecha = f'.filter(fecha__range = ("{start_date}", "{end_date}"))'

            query += filtro_fecha

        resultados = eval(query)

        keys = list(resultados[0].keys())
        data = [[] for i in range(len(keys))]
        for i in range(len(keys)):
            for resultado in resultados:
                data[i].append(resultado[keys[i]])

        if len(data) == 6:
            # Es un grafico triple
            respuesta['fecha'] = data[1][-1]
            respuesta['datos_x'] = data[2]
            respuesta['datos_y'] = data[3]
            respuesta['datos_y2'] = data[4]
            respuesta['datos_y3'] = data[5]

        elif len(data) == 4:
            # Es una tarjeta o grafico simple
            respuesta['fecha'] = data[1][-1]
            respuesta['datos_x'] = data[2]
            respuesta['datos_y'] = data[3]
        elif len(data) == 5:
            # Es un grafico doble
            respuesta['fecha'] = data[1][-1]
            respuesta['datos_x'] = data[2]
            respuesta['datos_y'] = data[3]
            respuesta['datos_y2'] = data[4]
        else:
            # Es una tarjeta de dato unico
            respuesta['fecha'] = data[1][-1]
            respuesta['datos_y'] = data[2]

        respuesta['cant_datos'] = [0 for i in range(len(respuesta['datos_y']) - 1)]

        respuesta['total'] = respuesta['datos_y'][-1]

        return respuesta
    fecha = models.DateField(verbose_name='Fecha', blank=True, null=True)


class Dataset_varios_datos(Dataset):
    eje_x = models.CharField(verbose_name='Fecha', max_length=256, blank=False, null=True)
    eje_y = models.IntegerField(verbose_name='Cantidad', blank=False, null=True)

    class Meta:
        abstract = True
        managed = False
        db_table = ''


class Dataset_dato_unico(Dataset):
    dato = models.CharField(verbose_name='Cantidad', max_length=256, blank=False, null=True)

    class Meta:
        abstract = True
        managed = False
        db_table = ''

# Modelo Vista
class Sisa_letalidad_por_rango_etario(Dataset_varios_datos):
    eje_y2 = models.IntegerField(verbose_name='Cantidad', blank=False, null=True)

    class Meta:
        managed = False
        db_table = 'dataset_sisa_letalidad_rango_etario'


class Sisa_confirmados_por_rango_etario(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_sisa_confirmados_por_rango_etario'


class Sisa_positivos_por_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_positivos_dia'


class Sisa_total_por_rango_etario(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_total_por_rango_etario'


class Sisa_positivos_alta_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_positivos_alta_dia'


class Sisa_fallecidos_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_fallecidos_dia'


class Sisa_positivos_genero(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_positivos_genero'


class Sisa_fallecidos_genero(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_fallecidos_genero'


class Sisa_fallecidos_promedio(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_promedio_fallecidos'


class Sisa_letalidad(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_letalidad'


class Sisa_positivos_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_positivos_acumulado'


class Sisa_altas_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_positivos_alta_acumulado'


class Sisa_fallecidos_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_fallecidos_acumulado'


class Sisa_hisopados_totales_por_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_hisopados_totales_dia'


class Sisa_hisopados_fecha(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_hisopados_confirmados'


class Sisa_hisopados_totales_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_hisopados_totales_acumulado'


class Sisa_hisopados_positivos_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sisa_hisopados_positivos_acumulado'


class Ufus_atencion_por_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_ufus_atencion_dia'


class Repatriados_por_pais(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_repatriados_pais'


class Repatriados_por_pais_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_repatriados_pais_acumulado'


class Botitriage_contactos_evolucion(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_botitriage_consultas_evolucion'


class Botitriage_contactos_acumulado(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_botitriage_consultas_acumulado'


class Llamados_107(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_107_llamados_dia'


class Hospedados_ingresos_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_hospedados_ingresos_dia'


class Hospedados_egresos_dia(Dataset_varios_datos):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_hospedados_egresos_dia'


class Hospedados_acumulados(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_hospedados_acumulados'


class Hospedados_flujo(Dataset_varios_datos):
    eje_y2 = models.IntegerField(verbose_name='Egresos', blank=False, null=True)

    class Meta:
        managed = False
        db_table = 'dataset_hospedados_flujo'


class Sube_ffcc_variacion_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sube_ffcc_variacion_dia'


class Sube_colectivo_variacion_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sube_colectivo_variacion_dia'


class Sube_subte_variacion_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_sube_subte_variacion_dia'


class Sube_transporte_publico_evolucion(Dataset_varios_datos):
    eje_y2 = models.IntegerField(verbose_name='Tren', blank=False, null=True)
    eje_y3 = models.IntegerField(verbose_name='Subte', blank=False, null=True)

    class Meta:
        managed = False
        db_table = 'dataset_sube_ultimo_mes_triple'


class Vehiculos_variacion_egreso_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_flujo_egreso_variacion_dia'


class Vehiculos_variacion_ingreso_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_flujo_ingreso_variacion_dia'


class Vehiculos_variacion_interna_dia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_flujo_ingreso_variacion_dia'


class Vehiculos_variacion_ultimo_mes(Dataset_varios_datos):
    eje_y2 = models.IntegerField(blank=False, null=True)
    eje_y3 = models.IntegerField(blank=False, null=True)

    class Meta:
        managed = False
        db_table = 'dataset_vehiculos_ultimo_mes_triple'


class Voluntarios_adultos_mayores_evolucion(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_voluntarios_adultos_mayores_evolucion'


class Logisitica_traslados_acumulados(Dataset_dato_unico):

    class Meta:
        managed = False
        db_table = 'dataset_logistica_traslados_acumulado'


class Logisitica_cecac_ufu_acumulado(Dataset_dato_unico):

    class Meta:
        managed = False
        db_table = 'dataset_logistica_cesac_ufu_acumulado'


class Logisitica_ufu_hotel_acumulado(Dataset_dato_unico):

    class Meta:
        managed = False
        db_table = 'dataset_ufu_hotel_acumulado'


class Voluntarios_vacunacion(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_voluntarios_vacunacion'


class Vacunacion_postas(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_vacunacion_postas'


class RRHH_Designados_enfermeros(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_enfermeros'


class RRHH_Designados_medicos(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_medicos'


class RRHH_Designados_kinesiologos(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_kinesiologos'


class RRHH_Designados_bioquimicos(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_bioquimicos'


class RRHH_Designados_tecnicos(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_tecnicos'


class RRHH_Designados_suplentes_guardia(Dataset_dato_unico):
    pass

    class Meta:
        managed = False
        db_table = 'dataset_designados_suplentes_guardia'


class Bp_Positivos_diarios(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_positivos_dia_barrios_populares'


class Bp_Positivos_acum(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_positivos_acumulado_barrios_populares'


class Bp_Altas_diarias(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_altas_dia_barrios_populares'


class Bp_Altas_acumuladas(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_altas_acumulado_barrios_populares'


class Bp_Fallecidos_diarias(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_fallecidos_dia_barrios_populares'


class Bp_Fallecimientos_acumuladas(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_fallecidos_acumulado_barrios_populares'


class Bp_Confirmados_fecha_hisopado(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_bp_confirmados_fecha_hisopado'


class Bp_Fallecidos_fecha_hisopado(Dataset_varios_datos):

    class Meta:
        managed = False
        db_table = 'dataset_bp_fallecidos_fecha_hisopado'
