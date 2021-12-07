# Ciudad 3D

### Update V1.1.6-RC.1:
- Se actualiza Autocompleter a su [ultima version](https://www.npmjs.com/package/@usig-gcba/autocompleter/v/2.2.6) en la seccion de dependecias del archivo [package.json](https://repositorio-asi.buenosaires.gob.ar/ssppbe_usig/cur3d/-/blob/master/source/package.json).
- La aplicacion se deploya principalmente en un ambiente de openshift
- El objetivo principal es deployar esta [aplicacion de openshift](http://ciudad3d-app-usig-desarrollo.apps.ocp4-dev.gcba.gob.ar/) en los ambientes de QA, HML, y PRD.

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

