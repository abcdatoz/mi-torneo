import {GET_REGION} from '../actions/RegionAction'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_REGION:
            return {
                ...state,
                lista: action.payload
            };

        default:{
            return state;
        }
            
    }
}