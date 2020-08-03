import psycopg2 as ps
import json


dir = ''

def create_dict(cursor):
    columnas = [col[0] for col in cursor.description]
    response = list(cursor.fetchall()[0])
    diccionario =  dict(zip(columnas, response))
    return diccionario

def dump_in_json(name, diccionario):
    with open(dir + name + '.json', 'w') as f:
        json.dump(diccionario, f)
    return



try:
    conexion = ps.connect(
                    host='ssppb-prd.postgres.database.azure.com',
                    database='prod_covid',
                    user='goid@ssppb-prd',
                    password='9$6VSPKbPuHs')

    cursor = conexion.cursor()

    views = {
        'reporte_gestion_sanitaria_json':'reporte_gestion_sanitaria',
        'reporte_casos_json':'reporte_casos',
        'reporte_movilidad_json':'reporte_movilidad'
    }

    for view in views.keys():
        cursor.execute('select * from {0}'.format(view))
        diccionario = create_dict(cursor)
        dump_in_json(views[view],diccionario)

except Exception as e:
    print(e)
finally:
    conexion.close()
