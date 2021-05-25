import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_TORNEOS = 'GET_TORNEOS';
export const ADD_TORNEO = 'ADD_TORNEO';
export const EDIT_TORNEO = 'EDIT_TORNEO';
export const DELETE_TORNEO='DELETE_TORNEO';

export const  getTorneos = () => (dispatch, getState) => {
    axios.get('/api/torneos/')
        .then( res => {
                dispatch({ 
                    type: GET_TORNEOS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addTorneo = (registro) => (dispatch, getState) => {
    axios.post ('/api/torneos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_TORNEO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editTorneo = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/torneos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_TORNEO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteTorneo = (id) => (dispatch, getState)=>{
    axios.delete(`/api/torneos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_TORNEO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};