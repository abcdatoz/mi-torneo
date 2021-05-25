import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_EQUIPOS = 'GET_EQUIPOS';
export const ADD_EQUIPO = 'ADD_EQUIPO';
export const EDIT_EQUIPO = 'EDIT_EQUIPO';
export const DELETE_EQUIPO='DELETE_EQUIPO';

export const  getEquipos = () => (dispatch, getState) => {
    axios.get('/api/equipos/')
        .then( res => {
                dispatch({ 
                    type: GET_EQUIPOS                    ,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addEquipo = (registro) => (dispatch, getState) => {
    axios.post ('/api/equipos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_EQUIPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editEquipo = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/equipos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_EQUIPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteEquipo = (id) => (dispatch, getState)=>{
    axios.delete(`/api/equipos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_EQUIPO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};