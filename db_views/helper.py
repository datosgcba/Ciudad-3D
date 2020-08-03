def populateResponse(response, data,tipo = None):
    response['fecha'] = data[-1][1]
    # Es tarjeta doble
    if tipo == 'tarjeta_doble':
        response['dato1'] = addDecimalFloat(data[0][2])
        response['dato2'] = addDecimalFloat(data[0][3])
        response['cant_datos'] = 1 
    # Es una tarjeta evolucion, grafico simple
    elif len(data[0]) == 4:
        response['datos_x'] = []
        response['datos_y'] = []
        for i in range(len(data)):
            response['datos_x'].append(data[i][2])
            response['datos_y'].append(data[i][3])
    # Es un grafico doble
    elif len(data[0]) == 5:
        response['datos_x'] = []
        response['datos_y'] = []
        response['datos_y2'] = []
        for i in range(len(data)):
            response['datos_x'].append(data[i][2])
            response['datos_y'].append(data[i][3])
            response['datos_y2'].append(data[i][4])
    # Es un grafico triple
    elif len(data[0]) == 6:
        response['datos_x'] = []
        response['datos_y'] = []
        response['datos_y2'] = []
        response['datos_y3'] = []
        for i in range(len(data)):
            response['datos_x'].append(data[i][2])
            response['datos_y'].append(data[i][3])
            response['datos_y2'].append(data[i][4])
            response['datos_y3'].append(data[i][5])
    else:
        # tarjeta de dato unico
        response['datos_y'] = []
        for i in range(len(data)):
            response['datos_y'].append(data[i][2])

    if 'cant_datos' not in response:
        response['cant_datos'] = [
            0 for i in range(len(response['datos_y']) - 1)]

        total = response['datos_y'][-1]

        if not isinstance(total, str):  # Si es un numero
            # Ponerle el punto separador de miles
            response['total'] = addDecimalFloat(total)
        else:
            response['total'] = total
    return


def addDecimalFloat(number):
    # Cosa horrible. TODO ver mejor opcion.
    decimal = ''
    if not isinstance(number,int):
        number,decimal = str(number).split('.')
    number = "{:,}".format(int(number)).replace(',', '.')
    number = number +','+ decimal if decimal else number
    return number

def getHelpText(cursor, nombre):
    cursor.execute(
        f"select column_name, data_type from INFORMATION_SCHEMA.COLUMNS where table_name = '{nombre}';")

    data_type_help = ''

    for row in cursor:
        data_type_help += 'Columna: ' + \
            row[0] + ' Tipo: ' + row[1] + '\n'

    cursor.execute(f'select * from {nombre} limit 1;')

    data_type_help += '-'*30 + '\n'
    data_type_help += 'Ejemplo: \n' + str(cursor.fetchone())
    
    return data_type_help
