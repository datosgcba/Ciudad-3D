# UPGRADE Ciudad 3D

## V1.3.0-RC.2:
- Realizar todos los pasos de la version V1.1.6-RC.1

### Update V1.3.0-RC.1:
- Dependiendo del ambiente descomentar la línea correspondiente en el archivo de configuración de ruta: `/source/.env`

  - Para QA descomentar la línea 9
  - Para HML descomentar la línea 12
  - Para PROD descomentar la línea 15

- Realizar pasos del V1.1.6-RC.1

### Update V1.2.0-RC.1:
Realizar los mismos pasos del V1.1.6-RC.1

### Update V1.1.6-RC.2:
Realizar los mismos pasos del V1.1.6-RC.1

### Update V1.1.6-RC.1:
- Ingresar a la carpeta del proyecto:

        cd /cur3d

- Actualizar desde git:

        git fetch && git fetch --tags
        git checkout develop
        git pull

- Actualizar paquetes:

        cd /source
        npm install

- Levantar el servicio:

        npm run build
        npm start

### Update V1.1.5-RC.1:
(#5854) agrega popups para describir los artículos de normativas que se mencionan en las alertas

## Update V1.1.4-RC.1:
- Actualizacion de descripcion en alerta CATALOGADO
- Unificar tejido consolodidado y no consolidado
- Boton para cambiar angulo de imagen 2D/3D

### Update V1.1.3-RC.1:
- Actualizacion de librerias

### Update V1.1.2-RC.1:
- appconfig con volumen_edif
- fix: capa tejido 2d por debajo de 3d
- fix: enlace nunca terminaba de cargar
- feat: capa tejido 2d
- incorporar los datos de Barrio Comuna
- se optimizo uso de memoria
- corrige informe PDF, reemplaza strings null por espacio en blanco

### Update V1.1-RC.1:
- Menu de navegación
- Medir distancias
- Se agregan alertas
- Se habilita Google Analytics

### Update V1.0-RC.5:
- Correcciones menores en alertas

### Update V1.0-RC.4:
- Correcciones menores estéticas y de textos
- Alertas especiales indicán área al que pertenecen

### Update V1.0-RC.3:
Se ajustaron varios detalles en el diseño y se hicieron correcciones en los textos.
Para que los cambios se vean reflejados se debe compilar nuevamente el proyecto

### Update V1.0-RC.2:
Se han cambiado los protocolos de las api *http* por *https*
Por lo tanto el proyecto debe compilarse nuevamente

