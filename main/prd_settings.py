from .base_settings import *

DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'prod_covid',
        'USER': 'goid@ssppb-prd',
        'PASSWORD': '9$6VSPKbPuHs',
        'HOST': 'ssppb-prd.postgres.database.azure.com',
        'PORT': '5432',
    }
}

BASE_URL = 'http://bamapas-test.eastus2.cloudapp.azure.com/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')


CACHE_TTL = 60 * 60 * 4  # 4 horas
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'PASSWORD':'plenTRAbEDr',
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
    }
}