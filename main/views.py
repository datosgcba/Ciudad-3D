from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import os
import sqlite3 as lite

from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.views.generic import TemplateView
from django.contrib.auth import login,logout
from django.http import HttpResponseRedirect
from .forms import FormularioLogin


# '''
# Manejo de vista de acceso
# '''
# @login_required
# def home(request):
#     user = request.user
#     return render(request, template_name='index.html')

class Inicio(TemplateView):
    """Clase que renderiza el index del sistema"""

    
    template_name = 'index.html'


'''
Clase para el logueo en el sistema
'''

class Login(FormView):
    template_name = 'admin/login.html'
    form_class = FormularioLogin
    success_url = reverse_lazy('index')

    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    def dispatch(self,request,*args,**kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login,self).dispatch(request,*args,**kwargs)

    def form_valid(self,form):
        login(self.request,form.get_user())
        return super(Login,self).form_valid(form)

def logoutUsuario(request):
    logout(request)
    return HttpResponseRedirect('/accounts/login/')


'''
Clase de manejo de Vector Tile
'''
class VectorTile(APIView):
    # permission_classes = (IsAuthenticated,)

    def get(self,request, folder,tileset, z, y, x):
        """
        Vista para renderizar vector tile desde mbtiles
        """
        
        filepath = folder + '/' + tileset + '.mbtiles'
        mbtiles = os.path.join(settings.TILES_ROOT, filepath)
        db = lite.connect(mbtiles)  
        cursor = db.cursor()
        flip = True
        if (flip):
            y = pow(2, z) - 1 - y
        z = str(z)
        y = str(y)
        x = str(x)    
        query = 'select tile_data as t from tiles where zoom_level=' + z + ' and tile_column=' + x + ' and tile_row=' + y
        result = cursor.execute(query)
        data = result.fetchall()
        if not data or data == False:
            #if tile doesn't exist        
            response = HttpResponse(status=204, content_type="application/json; charset=utf-8")
            response['Access-Control-Allow-Origin'] = '*'
            return response
        else: 
            #en python no hay un metodo fetchcolumn asi que tengo que usar [0][0]   
            response = HttpResponse(data[0][0], content_type="application/x-protobuf")
            response['Content-Encoding'] = 'gzip'
            response['Access-Control-Allow-Origin'] = '*'
            return response