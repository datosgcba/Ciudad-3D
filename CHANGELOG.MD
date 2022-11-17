# CHANGELOG Ciudad 3D

## CHANGELOG V1.4.0-RC2
- Actualizada versión de React JS de 17.0.2 a 18.2.0
- Reparado bug en la barra de búsqueda
- [APPCASENOC-495](https://asijira.buenosaires.gob.ar/browse/APPCASENOC-495) Arreglado icono: img satelital a calles
- Arreglado estilo de tabla en funcionalidad SADE
- Modificado titulos de categoria a reportes

## CHANGELOG V1.4.0-RC1
- Variables de entorno controladas a través del archivo source/public/config.js
- Mejora en el menu de capas. Ahora se despliega como un acordeon
- Incorporación visual de una lista flotante de capas seleccionadas
- Ahora el menú de capas al volver a hacer clic en el ícono "Capas" se colapsa y desaparece
- Armado del menú de capas dinámico. Se controla a través de EPOK
- Agregas nuevas capas no provenientes del motor de reglas
- Nueva funcionalidad que muestra los cuadros de uso por SMP consultado
- Nueva funcionalidad que conecta información del SADE por SMP consultado
- Nuefa funcionalidad que permite descargar un archivo CAD por SMP consultado

## V1.3.0-RC.2:
- Deshechos cambios que toman la configuracion del appconfig dinámicamente
- Actualizado appconfig hardcodeado

## CHANGELOG V1.3.0-RC.1:
- [(#5856)](https://sscite-redmine.buenosaires.gob.ar/issues/5856) correccion de alerta Manzanas Atípicas
- [(#5858)](https://sscite-redmine.buenosaires.gob.ar/issues/5858) actualizacion de alerta Catalogados
- [(#6034)](https://sscite-redmine.buenosaires.gob.ar/issues/6034) mejoras en el rendimiento del mapa
- [(#6036)](https://sscite-redmine.buenosaires.gob.ar/issues/6036) se incorporan datos para Extensiones Irregulares
- [(#6037)](https://sscite-redmine.buenosaires.gob.ar/issues/6037) se incorpora alerta para los casos de parcelas afectadas a Extension Irregulares
- [(#6038)](https://sscite-redmine.buenosaires.gob.ar/issues/6038) se incorporan datos de Plusvalia
- [(#6039)](https://sscite-redmine.buenosaires.gob.ar/issues/6039) modificacion del Documento "Reporte Urbanisitico"
- Modificada y dividida la configuracion del appconfig en los diversos ambientes

## CHANGELOG V1.2.0-RC.1:
- [(#5853)](https://sscite-redmine.buenosaires.gob.ar/issues/5853) seccion normativa
- [(#5854)](https://sscite-redmine.buenosaires.gob.ar/issues/5854) correccion de bugs del despliegue anterior
- [(#5859)](https://sscite-redmine.buenosaires.gob.ar/issues/5859) correccion de sintaxis de la seccion "Adyacente a edificio catalogado"
- [(#5861)](https://sscite-redmine.buenosaires.gob.ar/issues/5861) añade boton para cambiar perspectivas del mapa en 2D y 3D

## CHANGELOG V1.1.6-RC.2:
- Se corrige cámara de componente DimensionBtn
- Se resuelven algunas advertencias y errores
- Modificacion de alertas
- Se agregaron links al alerta Adyacente a edificio catalogado

## CHANGELOG V1.1.6-RC.1:
- Se incorpora api de Catastro Informal con los endpoints buscarManzana y direccionInformal

## CHANGELOG V1.1.5-RC.1:

- [(#5854)](https://sscite-redmine.buenosaires.gob.ar/issues/5854) agrega popups para describir los artículos de normativas que se mencionan en las alertas

## CHANGELOG V1.1.4-RC.1:
- Actualizacion de descripcion en alerta CATALOGADO
- Unificar tejido consolodidado y no consolidado
- Boton para cambiar angulo de imagen 2D/3D

## CHANGELOG V1.1.3-RC.1:
- Actualizacion de librerias


## CHANGELOG V1.1.2-RC.1:

### Tickets 4320
- appconfig con volumen_edif

### Tickets 3989
- fix: capa tejido 2d por debajo de 3d

### Tickets 4053
- fix: enlace nunca terminaba de cargar

### Tickets 3989
- feat: capa tejido 2d

### Tickets 4045
- incorporar los datos de Barrio Comuna

### Tickets 4289
- se optimizo uso de memoria

### Tickets 4288
- corrige informe PDF, reemplaza strings null por espacio en blanco



## CHANGELOG V1.1-RC.1:

### Tickets 3834
- Medir distancias

### Tickets 3845
- Enlaces en alertas

### Tickets 3837
- Boton norte

### Tickets 3265
- Alerta manzana atipica

### Tickets 3277
- Ajuste en alerta catalogado

### Tickets 3205
- Solicitud en el listado y alerta enrase

### Tickets 3279
- Foto fachada

### Tickets 3280
- Ajuste mail mesa de ayuda
