from rest_framework import serializers
from backend.models import Estado, Torneo, Grupo, Equipo, Jugador, Jornada, Juego,Gol, Premio, Visita

class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'

class TorneoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Torneo
        fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'

class EquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipo
        fields = '__all__'

class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'


class JornadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jornada
        fields = '__all__'
        
class JuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = '__all__'        

class GolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gol
        fields = '__all__'        

class PremioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Premio
        fields = '__all__'                

class VisitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visita
        fields = '__all__'                        