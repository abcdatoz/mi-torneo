import {GET_VISITAS, ADD_VISITA} from '../actions/VisitaActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_VISITAS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_VISITA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        default:{
            return state;
        }
            
    }
}