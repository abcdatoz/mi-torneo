from django.db import models
from django.contrib.auth.models import User
import os

# Create your models here.

class Estado(models.Model):
    clave = models.CharField(max_length=10)
    nombre = models.CharField(max_length=100)

def cambiar_ruta_de_fichero(instance, filename):
    if os.path.isdir(os.path.join('uploads', instance.titulo)):
        pass
    else:
        os.mkdir(os.path.join('uploads', instance.titulo))
    return os.path.join('uploads', instance.titulo , filename)

class Torneo(models.Model):
    estado = models.ForeignKey(Estado, on_delete=models.SET_NULL, null=True)
    localidad = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    status = models.CharField(max_length=10)
    imagen = models.ImageField(upload_to='torneos')        
    user_owner = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['nombre']    

class Grupo(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length = 50)
    torneo_owner = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['nombre']

class Equipo(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=100)    
    nombre_contacto = models.CharField(max_length=100)
    correo_contacto = models.CharField(max_length=100, null=True)
    telefono_contacto = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=10)
    torneo_owner = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['nombre']


class Jugador(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)
    equipo = models.ForeignKey(Equipo, on_delete=models.SET_NULL, null=True)    
    nombre = models.CharField(max_length=100)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['nombre']


class Jornada(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)    
    nombre = models.CharField(max_length=100)
    inicia = models.DateTimeField()    
    termina = models.DateTimeField()    
    aviso = models.CharField(max_length=100)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['nombre']


class Juego(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)    
    jornada = models.ForeignKey(Jornada, on_delete=models.SET_NULL, null=True)    
    equipoA = models.IntegerField()
    equipoB = models.IntegerField()
    fecha = models.DateTimeField()    
    hora = models.IntegerField()
    minuto = models.IntegerField()
    golesA = models.IntegerField()    
    golesB = models.IntegerField()
    puntosA = models.IntegerField()
    puntosB = models.IntegerField()
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['fecha', 'hora', 'minuto']

class Gol(models.Model):
    torneo = models.ForeignKey(Torneo, on_delete=models.SET_NULL, null=True)    
    juego = models.ForeignKey(Juego, on_delete=models.SET_NULL, null=True)    
    equipo = models.ForeignKey(Equipo, on_delete=models.SET_NULL, null=True)    
    jugador = models.ForeignKey(Jugador, on_delete=models.SET_NULL, null=True)    
    goles = models.IntegerField()
    tarjetas_amarillas = models.IntegerField()
    tarjeta_roja = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)    
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        ordering = ['equipo']
