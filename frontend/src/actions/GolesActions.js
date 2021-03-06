import axios from 'axios'
import { tokenConfig } from './auth'
import { DELETE_GRUPO } from './GrupoActions';

export const GET_GOLES = 'GET_GOLES';
export const ADD_GOL = 'ADD_GOL';
export const EDIT_GOL = 'EDIT_GOL';
export const DELETE_GOL = 'DELETE_GOL';

export const  getGoles = () => (dispatch, getState) => {
    axios.get('/api/goles/')
        .then( res => {
                dispatch({ 
                    type: GET_GOLES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addGol = (registro) => (dispatch, getState) => {
    axios.post ('/api/goles/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_GOL,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editGol = ( registro, id) => (dispatch, getState) => {
    axios.put(`/api/goles/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_GOL,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteGol = (id) => (dispatch, getState)=>{
    axios.delete(`/api/goles/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_GOL,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};