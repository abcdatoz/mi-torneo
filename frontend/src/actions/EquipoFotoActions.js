import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_EQUIPO_FOTO = 'GET_EQUIPO_FOTO';
export const ADD_EQUIPO_FOTO = 'ADD_EQUIPO_FOTO';
export const EDIT_EQUIPO_FOTO = 'EDIT_EQUIPO_FOTO';
export const DELETE_EQUIPO_FOTO='DELETE_EQUIPO_FOTO';

export const  getEquipoFoto = () => (dispatch, getState) => {
    axios.get('/api/fotoequipos/')
        .then( res => {
                dispatch({ 
                    type: GET_EQUIPO_FOTO,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addEquipoFoto = (registro) => (dispatch, getState) => {
    axios.post ('/api/fotoequipos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_EQUIPO_FOTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editEquipoFoto = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/fotoequipos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_EQUIPO_FOTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteEquipoFoto = (id) => (dispatch, getState)=>{
    axios.delete(`/api/fotoequipos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_EQUIPO_FOTO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};