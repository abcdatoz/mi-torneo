from rest_framework import viewsets, permissions
from rest_framework.response import Response

from backend.models import Estado, Torneo, Grupo, Equipo, Jugador, Premio
from backend.serializers import EstadoSerializer, TorneoSerializer, GrupoSerializer, EquipoSerializer, JugadorSerializer, PremioSerializer


from backend.models import Jornada, Juego, Gol
from backend.serializers import JornadaSerializer, JuegoSerializer, GolSerializer



class EstadoViewSet(viewsets.ModelViewSet):    
    queryset = Estado.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = EstadoSerializer

class TorneoViewSet(viewsets.ModelViewSet):
    queryset = Torneo.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = TorneoSerializer


    

    def create (self, request, *args, **kargs):
        data = request.data
        
        estado = Estado.objects.get(id=data['estado'])

        torneo = Torneo.objects.create(
            estado = estado,
            localidad = data['localidad'],
            nombre = data['nombre'],
            imagen = data['imagen'],            
            status = 'activo',
            user_owner = data['user'],
            created_by = self.request.user
        )


        torneo.save()
        serializer = TorneoSerializer(torneo)
        return Response(serializer.data)

    def update(self, request, *args, **kargs):        
        data = request.data

        estado = Estado.objects.get(id=data['estado'])

        instance = self.get_object()
        instance.imagen.delete()
        instance.nombre = data['nombre']
        instance.localidad = data['localidad']
        instance.estado = estado        
        instance.imagen = data['imagen']

        instance.save()
        serializer = TorneoSerializer(instance)
        return Response(serializer.data)
         
    
    def destroy(self, request, *args, **kargs):
        instance = self.get_object()
        instance.imagen.delete()
        self.perform_destroy(instance)

        serializer = TorneoSerializer(instance)        
        return Response(serializer.data)


class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = GrupoSerializer

    def create (self, request, *args, **kargs):
        data = request.data

        
        torneo = Torneo.objects.get(id=data['torneo']) 
        
        grupo = Grupo.objects.create(
            torneo = torneo,            
            nombre = data['nombre'],            
            created_by = self.request.user,
            torneo_owner = data['torneo']  
        )


        grupo.save()
        serializer = GrupoSerializer(grupo)
        return Response(serializer.data)

class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = EquipoSerializer


    def create (self, request, *args, **kargs):
        data = request.data 

        torneo = Torneo.objects.get(id=data['torneo'])
        grupo = Grupo.objects.get(id=data['grupo'])

        equipo = Equipo.objects.create(
            torneo = torneo,
            grupo = grupo,
            nombre = data['nombre'],
            nombre_contacto = data['nombreContacto'],
            correo_contacto=data['correoContacto'],
            telefono_contacto=data['telefonoContacto'],
            status= data['status'],
            created_by = self.request.user,
            torneo_owner = data['torneo']  
        )

        equipo.save()
        serializer = EquipoSerializer(equipo)
        return Response(serializer.data)

    def update(self, request, *args, **kargs):        
        data = request.data

        

        instance = self.get_object()
        
        instance.nombre = data['nombre']
        instance.nombre_contacto = data['nombreContacto']
        instance.correo_contacto = data['correoContacto']
        instance.telefono_contacto = data['telefonoContacto']
        instance.status = data['status']
        

        instance.save()
        serializer = EquipoSerializer(instance)
        return Response(serializer.data)        

class JugadorViewSet(viewsets.ModelViewSet):
    queryset = Jugador.objects.all()
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = JugadorSerializer


    def create (self, request, *args, **kargs):
        data = request.data 

        torneo = Torneo.objects.get(id=data['torneo'])
        equipo = Equipo.objects.get(id=data['equipo'])

        jugador = Jugador.objects.create(
            torneo = torneo,
            equipo = equipo,
            nombre = data['nombre'],            
            status= data['status'],
            created_by = self.request.user
            
        )

        jugador.save()
        serializer = JugadorSerializer(jugador)
        return Response(serializer.data)



class JornadaViewSet(viewsets.ModelViewSet):
    queryset = Jornada.objects.all()
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = JornadaSerializer


    def create (self, request, *args, **kargs):
        data = request.data 

        torneo = Torneo.objects.get(id=data['torneo'])


        jornada = Jornada.objects.create(
            torneo = torneo,            
            nombre = data['nombre'],            
            inicia = data['inicia'],     
            termina = data['termina'],     
            aviso = data['aviso'],     
            status= data['status'],
            created_by = self.request.user
            
        )

        jornada.save()
        serializer = JornadaSerializer(jornada)
        return Response(serializer.data)

    def update(self, request, *args, **kargs):        
        data = request.data        

        instance = self.get_object()        
        instance.status = data['status']
        instance.save()
        serializer = JornadaSerializer(instance)
        return Response(serializer.data)     



class JuegoViewSet(viewsets.ModelViewSet):
    queryset = Juego.objects.all()
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = JuegoSerializer


    def create (self, request, *args, **kargs):
        data = request.data 

        torneo = Torneo.objects.get(id=data['torneo'])
        jornada = Jornada.objects.get(id=data['jornada'])
        
        

        puntosA = 0
        puntosB = 0

        if data['status'] == 'finalizado':
            if data['golesA'] == data['golesB']:
                puntosA=1
                puntosB=1
            elif data['golesA'] > data['golesB']:
                puntosA=3
                puntosB=0
            elif data['golesA'] < data['golesB']:
                puntosA=0
                puntosB=3




        juego = Juego.objects.create(
            torneo = torneo,            
            jornada = jornada,            
            equipoA = data['equipoA'],
            equipoB = data['equipoB'],
            fecha = data['fecha'],            
            hora = data['hora'],     
            minuto = data['minuto'],     
            golesA = data['golesA'],     
            golesB = data['golesB'],
            puntosA = puntosA,
            puntosB =puntosB,
            status = data['status'],
            created_by = self.request.user
            
        )

        juego.save()
        serializer = JuegoSerializer(juego)
        return Response(serializer.data)

    def update(self, request, *args, **kargs):        
        data = request.data        

        instance = self.get_object()

        puntosA = 0
        puntosB = 0

        if data['status'] == 'Finalizado':
            if data['golesA'] == data['golesB']:
                puntosA=1
                puntosB=1
            elif data['golesA'] > data['golesB']:
                puntosA=3
                puntosB=0
            elif data['golesA'] < data['golesB']:
                puntosA=0
                puntosB=3
        

        
        instance.golesA = data['golesA']    
        instance.golesB = data['golesB']
        instance.puntosA = puntosA
        instance.puntosB =puntosB
        instance.status = data['status']
            

        instance.save()
        serializer = JuegoSerializer(instance)
        return Response(serializer.data)        



class GolViewSet(viewsets.ModelViewSet):
    queryset = Gol.objects.all()
    permission_classes =  [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = GolSerializer


    def create (self, request, *args, **kargs):
        data = request.data 

        torneo = Torneo.objects.get(id=data['torneo'])
        juego = Juego.objects.get(id=data['juego'])
        equipo = Equipo.objects.get(id=data['equipo'])
        jugador = Jugador.objects.get(id=data['jugador'])
        

        gol = Gol.objects.create(
            torneo = torneo,            
            juego = juego,
            equipo = equipo,
            jugador = jugador,
            goles = data['goles'],            
            tarjetas_amarillas = data['tarjeta_amarilla'],     
            tarjeta_roja = data['tarjeta_roja'],                             
            created_by = self.request.user            
        )

        gol.save()
        serializer = GolSerializer(gol)
        return Response(serializer.data)


class PremioViewSet(viewsets.ModelViewSet):    
    queryset = Premio.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PremioSerializer   