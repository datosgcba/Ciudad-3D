from django.apps import apps
from django.shortcuts import render, redirect
from django.conf import settings
from django.db.models import aggregates

from componentes.models import Indicador
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)



#@cache_page(CACHE_TTL)
def render_indicador(request, id_indicador):
    indicador = Indicador.objects.get(id_indicador=id_indicador)
    render = apps.get_app_config('componentes').models[indicador.render]
    componente = render.objects.get(id_indicador=id_indicador)
    return componente.renderizar(request)


def test_covid(request):
    return render(request, 'index.html', {'base_url': settings.BASE_URL})

def handler500(request):
    return redirect('https://site-error.buenosaires.gob.ar/')
