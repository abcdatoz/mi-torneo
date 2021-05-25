import {combineReducers} from 'redux'

import auth from './auth'

import estados from './EstadoReducer'
import torneos from './TorneoReducer'
import grupos from './GrupoReducer'
import equipos from './EquipoReducer'
import jugadores from './JugadorReducer'

export default combineReducers({
    auth, 
    estados,
    torneos,
    grupos,
    equipos,
    jugadores
});