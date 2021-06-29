import axios from 'axios'

export const GET_REGION = 'GET_REGION';

export const  getRegion = () => (dispatch) => {
    axios.get('https://ipapi.co/json/')
        .then( res => {
                dispatch({ 
                    type: GET_REGION,
                    payload: res.data 
                });
            })
        .catch(err => { dispatch({ 
            type: GET_REGION,
            payload: {ip: 'error, no ip', city: 'no city', region:'no region'}
        });  })
};  

 