import  { GET_ESTADOS } from '../actions/EstadoActions'

const initialState = {
    lista:[]
}



export default function(state=initialState, action){
    switch (action.type){
        case GET_ESTADOS:
            return {
                ...state,
                lista: action.payload
            };
        
        
        default:{
            return state;
        }
            
    }
}