import React, { useState,useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getEstados} from '../actions/EstadoActions'
import {getTorneos} from '../actions/TorneoActions'

import { getGrupos } from '../actions/GrupoActions'
import { getEquipos } from '../actions/EquipoActions'
import { getJugadores } from '../actions/JugadorActions'

import { getJornadas } from '../actions/JornadaActions'
import { getJuegos } from '../actions/JuegosActions'
import { getGoles } from '../actions/GolesActions'


import TablaGeneral from './TablaGeneral'
import TablaPorGrupo from './TablaPorGrupo'
import Goleo from './Goleo'
import VerJornadas from './VerJornadas'

const Home = () => {


    //use states
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')
    const [typ, setTyp] = useState('')

    const [filtroNombre, setFiltroNombre] = useState('')
    const [filtroLocalidad, setFiltroLocalidad] = useState('')


    //use selectors
    const {isAuthenticated, user} = useSelector( store => store.auth);
    const estados = useSelector(state => state.estados.lista)
    const torneos = useSelector(state => state.torneos.lista)

    const grupos = useSelector(state => state.grupos.lista)
    const equipos = useSelector(state => state.equipos.lista)

    const juegos = useSelector(state => state.juegos.lista)
    const goles =  useSelector(state => state.goles.lista)
    




    //use dispatch
    const dispatch = useDispatch()

    
    //useEffect
    useEffect( () => {
        dispatch(getEstados())
        dispatch(getTorneos())
        
        dispatch(getGrupos())
        dispatch(getEquipos())

        dispatch(getJornadas())
        dispatch(getJuegos())

        dispatch(getJugadores())        
        dispatch(getGoles())        
       
    },[])



    const seeDetails = (torn, quever) => {
        setTorneo(torn.id)
        setNombreTorneo(torn.nombre)        
        setTyp(quever)
    }


     




   
    const listatorneos = (
        <>        
    
        <table className="table table-striped">
            <thead>
                <th width="10%"></th>
                <th width="20%">                    
                    <input 
                            type="text"
                            placeholder="filtrar x nombre de torneo"
                            name="filtroNombre"
                            value={filtroNombre}
                            onChange={ e => setFiltroNombre(e.target.value)}
                        />   
                </th>
                <th width="20%">                    
                    <input 
                            type="text"
                            placeholder="filtrar x localidad donde se juega"
                            name="filtroLocalidad"
                            value={filtroLocalidad}
                            onChange={ e => setFiltroLocalidad(e.target.value)}
                        />   
                    </th>               
                
            </thead>     
            </table>

           


        <div className="x-container">
            {
                torneos
                    .filter (x => x.nombre.toUpperCase().includes(filtroNombre.toUpperCase()) 
                               && x.localidad.toUpperCase().includes(filtroLocalidad.toUpperCase()) )                    
                    .map( torneo => (

                        <div key={torneo.id} className="x-card">
                            <div className="x-box">
                            <div className="x-content">
                                <h2><img  src={torneo.imagen} width="100" height="100"/></h2>
                                <h3>{torneo.nombre}</h3>
                                <p>{torneo.localidad} | { estados.filter(x=>x.id == torneo.estado)[0].nombre }</p>
                                <a href ="#" onClick={ () => seeDetails(torneo, 'tabla_general')}>Tabla General</a>
                                <a href ="#" onClick={ () => seeDetails(torneo, 'tabla_por_grupos')}>Tabla por Grupos</a>
                                <a href ="#" onClick={ () => seeDetails(torneo, 'goleo')}>Ver Goleo</a>
                                <a href ="#" onClick={ () => seeDetails(torneo, 'ver_jornadas')}>Ver Jornadas</a>
                                
                            </div>
                            </div>
                        </div>                     

                ))
            }
            
        </div>



    
        </>
    )

      
    

    const userOption = (
        <>
            <div className="subheader">
                
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

                                
                    <li className="nav-item">
                        <a className="dropdown-item" href="/#/torneos">Torneos</a>
                    </li>
                    <li className="nav-item">
                        <a className="dropdown-item" href="/#/equipos">Equipos</a>
                    </li>
                    <li className="nav-item">
                        <a className="dropdown-item" href="/#/juegos">Juegos</a>
                    </li>

                    <li className="nav-item">
                        <a className="dropdown-item" href="/#/rol">Nuevo Rol</a>
                    </li>     

                </ul>                        

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
                : (
                    <>
                        <h5>{ nombreTorneo }</h5>
            
                        <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                            regresar
                        </button>            



                        {(() => {

                            switch(typ) {

                                case "tabla_general":       return <TablaGeneral idTorneo={torneo} />;
                                case "tabla_por_grupos":    return <TablaPorGrupo idTorneo={torneo} />;
                                case "goleo":               return <Goleo idTorneo={torneo} />;
                                case "ver_jornadas":        return <VerJornadas idTorneo={torneo} />;
                                

                                default:      return <h1>No tournament selected</h1>
                            }


                        })()}    

                    </>
                )                                       
                
        } 


 
        </>
    )
}


export default Home;
