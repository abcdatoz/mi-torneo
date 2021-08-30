from rest_framework import routers
from .api import EstadoViewSet, TorneoViewSet, GrupoViewSet, EquipoViewSet, JugadorViewSet, JornadaViewSet, JuegoViewSet, GolViewSet, PremioViewSet, VisitaViewSet, EquipoFotoViewSet, EquipoEscudoViewSet

router = routers.DefaultRouter()

router.register('api/estados', EstadoViewSet) 
router.register('api/torneos', TorneoViewSet)
router.register('api/grupos', GrupoViewSet)
router.register('api/equipos', EquipoViewSet)
router.register('api/jugadores', JugadorViewSet)

router.register('api/jornadas', JornadaViewSet)
router.register('api/juegos', JuegoViewSet)
router.register('api/goles', GolViewSet)
router.register('api/premios', PremioViewSet)
router.register('api/arrives', VisitaViewSet)

router.register('api/fotoequipos', EquipoFotoViewSet)
router.register('api/escudoequipos', EquipoEscudoViewSet)

urlpatterns = router.urls
