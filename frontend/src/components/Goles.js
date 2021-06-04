import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { getJugadores } from '../actions/JugadorActions'

const Gol = (props) => {


    //use state
    const [goles, setGoles] = useState(0)

    //use selector
    const auth = useSelector(state => state.auth)    
    const jugadores = useSelector(state => state.jugadores.lista)

    //use dispatch
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getJugadores())
    },[])



    return (
        <>
            <h3>asd</h3>
            <ul>
            {
                jugadores
                    .filter(x=>x.equipo == props.equipo)
                    .map((player, ndx) =>(
                        <li key={mdx}>{player.nombre}</li>
                    ))
            }
            </ul>
        </>
    )

}

export default Gol