import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_EQUIPO_ESCUDO = 'GET_EQUIPO_ESCUDO';
export const ADD_EQUIPO_ESCUDO = 'ADD_EQUIPO_ESCUDO';
export const EDIT_EQUIPO_ESCUDO = 'EDIT_EQUIPO_ESCUDO';
export const DELETE_EQUIPO_ESCUDO='DELETE_EQUIPO_ESCUDO';

export const  getEquipoEscudo = () => (dispatch, getState) => {
    axios.get('/api/escudoequipos/')
        .then( res => {
                dispatch({ 
                    type: GET_EQUIPO_ESCUDO,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addEquipoEscudo = (registro) => (dispatch, getState) => {
    axios.post ('/api/escudoequipos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_EQUIPO_ESCUDO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editEquipoEscudo = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/escudoequipos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_EQUIPO_ESCUDO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteEquipoEscudo = (id) => (dispatch, getState)=>{
    axios.delete(`/api/escudoequipos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_EQUIPO_ESCUDO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};