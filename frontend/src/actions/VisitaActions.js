import axios from 'axios'

export const GET_VISITAS = 'GET_VISITAS';
export const ADD_VISITA = 'ADD_VISITA';

export const  getVisitas = () => (dispatch) => {
    axios.get('/api/arrives/')
        .then( res => {
                dispatch({ 
                    type: GET_VISITAS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addVisita = (registro) => (dispatch) => {
    axios.post ('/api/arrives/', registro)
        .then(res=>{
            dispatch({
                type: ADD_VISITA,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};
