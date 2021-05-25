import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_JUGADORES = 'GET_JUGADORES';
export const ADD_JUGADOR = 'ADD_JUGADOR';
export const EDIT_JUGADOR = 'EDIT_JUGADOR';
export const DELETE_JUGADOR='DELETE_JUGADOR';

export const  getJugadores = () => (dispatch, getState) => {
    axios.get('/api/jugadores/')
        .then( res => {
                dispatch({ 
                    type: GET_JUGADORES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addJugador = (registro) => (dispatch, getState) => {
    axios.post ('/api/jugadores/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_JUGADOR,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editJugador = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/jugadores/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_JUGADOR,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteJugador = (id) => (dispatch, getState)=>{
    axios.delete(`/api/jugadores/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_JUGADOR,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};