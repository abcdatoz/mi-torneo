import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_ESTADOS = 'GET_ESTADOS'


export const getEstados = () => (dispatch, getState) => {

    axios.get('/api/estados/')
        .then( res => {
            dispatch({
                type: GET_ESTADOS,
                payload: res.data
            })
        })
        .catch(err => { console.log("error message :" + err.message) })
}