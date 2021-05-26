import {combineReducers} from 'redux'

import auth from './auth'

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
    estados,
    torneos,
    grupos,
    equipos,
    jugadores,
    jornadas,
    juegos,
    goles
});