from rest_framework import routers
from .api import EstadoViewSet, TorneoViewSet, GrupoViewSet, EquipoViewSet, JugadorViewSet, JornadaViewSet, JuegoViewSet, GolViewSet

router = routers.DefaultRouter()

router.register('api/estados', EstadoViewSet) 
router.register('api/torneos', TorneoViewSet)
router.register('api/grupos', GrupoViewSet)
router.register('api/equipos', EquipoViewSet)
router.register('api/jugadores', JugadorViewSet)

router.register('api/jornadas', JornadaViewSet)
router.register('api/juegos', JuegoViewSet)
router.register('api/goles', GolViewSet)



urlpatterns = router.urls
