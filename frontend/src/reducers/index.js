import {combineReducers} from 'redux'

import auth from './auth'
import datosRegion from './RegionReducer'
import visitas from './VisitaReducer'

import estados from './EstadoReducer'
import torneos from './TorneoReducer'
import grupos from './GrupoReducer'
import equipos from './EquipoReducer'
import jugadores from './JugadorReducer'

import jornadas from './JornadaReducer'
import juegos from './JuegoReducer'
import goles from './GolReducer'

export default combineReducers({
    auth, 
    datosRegion,
    visitas,
    estados,
    torneos,
    grupos,
    equipos,
    jugadores,
    jornadas,
    juegos,
    goles
});