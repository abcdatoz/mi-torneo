import React, { useState,useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getEstados} from '../actions/EstadoActions'
import {getTorneos} from '../actions/TorneoActions'
import { getJornadas } from '../actions/JornadaActions'
import { getJuegos } from '../actions/JuegosActions'
import { getEquipos } from '../actions/EquipoActions'
import { getGoles } from '../actions/GolesActions'
import { getJugadores } from '../actions/JugadorActions'
import {Link} from 'react-router-dom'


const Home = () => {


    //use states
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')

    const [tablaGen, setTablaGen] = useState([])


    //use selectors
    const {isAuthenticated, user} = useSelector( store => store.auth);
    const estados = useSelector(state => state.estados.lista)
    const torneos = useSelector(state => state.torneos.lista)
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const goles = useSelector(state => state.goles.lista)
    const jugadores = useSelector(state => state.jugadores.lista)

    //use dispatch
    const dispatch = useDispatch()

    
    //useEffect
    useEffect( () => {
        dispatch(getEstados())
        dispatch(getTorneos())
        dispatch(getJornadas())
        dispatch(getJuegos())
        dispatch(getEquipos())
        dispatch(getGoles())
        dispatch(getJugadores())        
    },[])



    const verTablaGeneral = (item) => {
        setTorneo(item.id)
        setNombreTorneo(item.nombre)


        
        let teams = equipos.filter(x=>x.torneo == item.id)
        let arr = []
        
        teams.forEach(team => {
            let puntos = 0
            let golesAfavor = 0
            let golesEnContra = 0
            let jj = 0
            let jg = 0
            let jp = 0
            let je = 0

            

            let games = juegos.filter(x=>x.equipoA == team.id)
            games.forEach(game => {
                
                puntos = puntos + game.puntosA
                golesAfavor = golesAfavor + game.golesA
                golesEnContra = golesEnContra + game.golesB 
                
                                
                jj++
                if (game.golesA > game.golesB)
                    jg++

                if(game.golesA < game.golesB)
                    jp++

                if(game.golesA == game.golesB)
                    je++
                

            });

            games = juegos.filter(x=>x.equipoB == team.id)
            games.forEach(game => {
                puntos = puntos + game.puntosB
                golesAfavor = golesAfavor + game.golesB
                golesEnContra = golesEnContra + game.golesA 
                
                jj++
                if (game.golesB > game.golesA)
                    jg++

                if(game.golesB < game.golesA)
                    jp++

                if(game.golesB == game.golesA)
                    je++
            });


            let obj = {
                id: team.id,
                nombre: team.nombre,
                puntos: puntos,
                golesAfavor: golesAfavor,
                golesEnContra: golesEnContra,
                diferencia: golesAfavor - golesEnContra,
                jj,
                jg,
                jp,
                je
            }

            arr.push(obj)

            
        });

        
        arr.sort((a,b) => b.puntos - a.puntos)

 

        setTablaGen(arr)
    }
   
    const listatorneos = (
        <>
        <h5>Ubica tu Torneo </h5>
    
        <table className="table table-striped">
            <thead>
                <th width="10%"></th>
                <th width="20%">Nombre del torneo</th>
                <th width="20%">Lugar donde se juega</th>
                <th width="10%">Ver</th>                
                <th width="10%">status</th>
                
            </thead>     
            <tbody>
                {
                    torneos                    
                    .map(torneo=>(
                        <tr key={torneo.id}>
                            <td> <img src={torneo.imagen}  alt="imagen" width="100px" height="100px"/> </td>
                            <td>{torneo.nombre}</td>
                            <td> { estados.filter(x=>x.id == torneo.estado)[0].nombre } | {torneo.localidad}</td>                            
                            <td>
                                <button  onClick={() => { verTablaGeneral(torneo)}} className="btn btn-outline-success" >
                                    tabla General
                                </button>           
                                <button  onClick={() => { verTablaGeneral(torneo)}} className="btn btn-outline-success" >
                                    tabla General por Grupo
                                </button>           
                            </td>
                            <td>{torneo.status}</td>
                        </tr>
                    ))
                }
                            
            </tbody>
        </table>
    
        </>
    )

     
    





    const tablaGeneral = (
        <>        
            <h5>{ nombreTorneo }</h5>
            
            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                regresar
            </button> 
           
            
            <table className="table table-striped">
                <thead>
                <th width="5%">#</th>
                <th width="25%">Equipo</th>
                <th width="5%">JJ</th>
                <th width="5%">JG</th>
                <th width="5%">JP</th>
                <th width="5%">JE</th>                
                <th width="5%"></th>                
                <th width="5%">GF</th>
                <th width="5%">GC</th>
                <th width="5%">Dif</th>
                <th width="5%"></th>                
                <th width="5%">Puntos</th>                     
                
                </thead>

                <tbody>
                {
                    tablaGen
                    .map((item,ndx) => (
                        <tr key={item.id}  >
                            <td>{ndx + 1}</td>
                            <td> {item.nombre}</td>
                            <td>{item.jj} </td>
                            <td>{item.jg} </td>
                            <td>{item.jp} </td>
                            <td>{item.je} </td>
                            <td> </td>
                            <td>{item.golesAfavor} </td>
                            <td>{item.golesEnContra} </td>
                            <td>{item.diferencia} </td>
                            <td> </td>
                            <td>{item.puntos} </td>                                                                                
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </>

    )





    const userOption = (
        <>

            <div className="subheader">
                <h2><span> user options</span></h2>
            </div>


                      
         </>
    )

    return(
 
        < >

        

        {
            isAuthenticated && !user.is_staff
            ? userOption
            : torneo == ''
                ? listatorneos
                : tablaGeneral
        } 


 
        </>
    )
}


export default Home;
