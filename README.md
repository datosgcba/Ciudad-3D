# BA Mapas
### Uso:
En src/config.js se configuran los grupos y las capas que figurarán en el panel lateral.<br />
Actualmente se utiliza una url que depende del entorno lo sirve un django local o se sirve desde el nginx de cada servidor.
Se pueden usar capas públicas y ya configuradas que se sirven en epok desde [este endpoint](https://epok.buenosaires.gob.ar/mapainteractivoba/layers/?protocol=https) asi como también creando capas usando directamente las funcionalidades de [mapbox gl js](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
En la carpeta /media/data se encuentran los geojson que se levantan de manera local
En el archivo config.js tambien se encuentran las imagenes de los puntos,  las referencias de las capas que estan de manera local y los links de BAData para cada capa <br />


### Nota del autor:

Este proyecto depende fuertemente de src/utils/MapaInteractivoGL.js que es una clase que intenta reemplazar la librería publicada en npm de [mapainteractivo](https://www.npmjs.com/package/@usig-gcba/mapa-interactivo) pero usando mapbox en lugar de leaflet.
En el futuro probablemente sea conveniente usar directamente [react-map-gl](https://uber.github.io/react-map-gl/) o [deck.gl](https://deck.gl/#/), eso es algo que habría que evaluar. 

### Deploy
Esto fue hecho con create-react-app así que abajo está mas o menos todo lo que tienen que saber.

Lo único importante a saber es que si el mapa se va a publicar en una url que no es la base del dominio se tiene que agregar el atributo "homepage" en el package.json ... <br />
ejemplo: <br />
"homepage": "https://usig.buenosaires.gob.ar/mi-mapa"
<br />
Para levantar el django habría que seguir el [instructivo] (https://www.digitalocean.com/community/tutorials/como-configurar-django-con-postgres-nginx-y-gunicorn-en-ubuntu-18-04-es) para instalar Gunicorn para servir DJANGO



## Stack

- Django (backend) 
- React (frontend)

# Instalación (Entorno de desarrollo)

note: GDAL no esta al dia de hoy lanzado para ubuntu 20 lts

## Backend:

```json
 sudo apt update
 sudo apt install python3-pip
 sudo apt-get install libsasl2-dev python-dev libldap2-dev libssl-dev
 sudo pip3 install virtualenv
 virtualenv env
 source env/bin/activate
 pip install -r requirements.txt
 python manage.py migrate
 python manage.py createsuperuser
 sudo add-apt-repository ppa:ubuntugis/ppa && sudo apt-get update
 sudo apt-get install gdal-bin
```
### Instalar Redis como Backend de Cache en Django
1. Instalación y configuración de Redis
Para acceder a la versión más reciente de Redis, utilizaremos apt para instalarla desde los repositorios oficiales de Ubuntu.
Actualice su caché de paquetes local de apt e instale Redis ingresando lo siguiente:
```
sudo apt update
```
```
sudo apt install redis-server
```
Esto descargará e instalará Redis y sus dependencias. Después de esto, hay un cambio de configuración importante que se debe realizar en el archivo de configuración de Redis, generado automáticamente durante la instalación.
Abra este archivo con su editor de texto preferido:
```
sudo nano /etc/redis/redis.conf
```
Encuentre la directiva supervised dentro del archivo. Esta directiva le permite declarar un sistema init para administrar Redis como un servicio, lo que le proporcionará mayor control sobre su funcionamiento. Por defecto, el valor de la directiva supervised es no. Debido a que se trata de Ubuntu, el cual utiliza el sistema init de systemd, cambie el valor a systemd:
supervised systemd

Reinicie el servicio de Redis para reflejar los cambios realizados en el archivo de configuración:
```
sudo systemctl restart redis.service
```
2. Pruebas en Redis
Comience verificando que el servicio de Redis esté en ejecución:
```
sudo systemctl status redis.service
```
Para comprobar que Redis funcione de forma correcta, establezca conexión con el servidor utilizando el cliente de línea de comandos:
```
redis-cli
```
En la siguiente línea de comandos, realice una prueba de conectividad con el comando ping:
```
ping
```
```
Output
PONG
```
3. Configurar un contraseña de Redis: <br>
Editar configuración:
sudo nano /etc/redis/redis.conf
Editar Linea:
requirepass <micontraseña>
Reiniciar servicio:
```
sudo systemctl status redis.service
```
4. Configurar Redis en Django
Instalar Django-redis
Parados en nuestro entorno virtual ejecutar:
pip install django-redis
En el settings.py
```
CACHE_TTL = 60 * 15  # 15 minutos
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
    }
}
```
En la view.py que se desee cachear:

from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

Sobre el método que se desea cachear colocar el decorador:
@cache_page(CACHE_TTL)


### para levantarlo:

```bash
python manage.py runserver

ir a http://127.0.0.1:8000/admin/
```



## Frontend:

```bash
npm install
```
### para levantarlo:

```bash
npm start

ir a http://localhost:3000
```
## Entorno
Utiliza los archivos .env, para poder hacer un build para produccion es necesario tener creado el .env.prod con la misma estructura que el archivo
.env.example

## Construir frontend (React) y unirlo con Django

### Dev: compilará el código con las variables seteadas en el archivo .env.development
```bash
npm run build:dev
python manage.py collectstatic
```

### Prod: compilará el código con las variables seteadas en el archivo .env.production
```bash
npm run build:production
```


