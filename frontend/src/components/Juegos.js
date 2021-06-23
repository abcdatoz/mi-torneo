import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getEstados} from '../actions/EstadoActions'
import {getTorneos} from '../actions/TorneoActions'
import { getJornadas, addJornada,editJornada, deleteJornada } from '../actions/JornadaActions'
import { getJuegos, addJuego, deleteJuego, editJuego } from '../actions/JuegosActions'
import { getEquipos } from '../actions/EquipoActions'
import { getGoles,addGol,deleteGol } from '../actions/GolesActions'
import { getJugadores, addJugador } from '../actions/JugadorActions'


const Juego = () => {

    //useStates

    //torneo
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')
    //jornada
    const [nombre, setNombre] = useState('')
    const [inicia, setInicia] = useState('')
    const [termina, setTermina] = useState('')
    const [aviso, setAviso] = useState('')
    //juego
    const [journey, setJourney] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [minuto, setMinuto] = useState('')
    const [equipoA, setEquipoA] = useState('')
    const [equipoB, setEquipoB] = useState('')
    const [golesA, setGolesA] = useState(0)
    const [golesB, setGolesB] = useState(0)
    //goles
    const [nombreJornada, setNombreJornada] = useState('')
    const [idJuego, setIdJuego] = useState('')
    const [idTeamA, setIdTeamA] = useState('')
    const [idTeamB, setIdTeamB] = useState('')
    const [nombreTeamA, setNombreTeamA] = useState('')    
    const [nombreTeamB, setNombreTeamB] = useState('')
    const [statusJuego, setStatusJuego] = useState('')
    //player A
    const [jugadorA, setJugadorA] = useState('')
    const [golA, setGolA] = useState(0)
    const [amarillaA, setAmarillaA] = useState(0)
    const [rojaA, setRojaA] = useState(0)
    //player B
    const [jugadorB, setJugadorB] = useState('')
    const [golB, setGolB] = useState(0)
    const [amarillaB, setAmarillaB] = useState(0)
    const [rojaB, setRojaB] = useState(0)

    //Alta de jugadores
    const [equipoAlta, setEquipoAlta] = useState('')
    const [nombreAlta, setNombreAlta] = useState('')
    
    

    const [listaHoras, setListaHoras] = useState([        
        {hora: '07'}, {hora: '08'}, {hora: '09'}, {hora: '10'}, {hora: '11'}, {hora: '12'},
        {hora: '13'}, {hora: '14'}, {hora: '15'}, {hora: '16'}, {hora: '17'}, {hora: '18'},
        {hora: '19'}, {hora: '20'}, {hora: '21'}, {hora: '22'}, {hora: '23'}        
    ])
    
    const [listaMinutos, setListaMinutos] = useState([
        {min: '00'}, {min: '10'}, {min: '20'}, {min: '30'}, {min: '40'},{min: '50'}        
    ])


    //use selectors
    const auth = useSelector(state => state.auth)    
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



 
      



    //jornadas
    const newJornada =() => {
        let newJ = jornadas.filter(x=>x.torneo == torneo).length + 1
        setNombre('Jornada ' + newJ)        
    }
   

    const guardar = (e) => {
        e.preventDefault()

        if (nombre == '') {
            alert('No ha capturado el nombre de la jornada')
            return
        }
        
        let data = {
            torneo,            
            nombre,
            inicia : inicia + ' 00:00:00',
            termina : termina + ' 00:00:00' ,
            aviso,
            status: 'Abierta'   
        }
        
        dispatch(addJornada(data))   
        $('#MyModal').modal('hide')
    }

    const eliminarJornada = (id) =>{
        dispatch(deleteJornada(id))   
    }

    const preCierreJornada = (id) =>{

        if(juegos.filter(x=> x.jornada == id).length == 0){
            alert('Para poder cerrar la jornada debe de haber partidos registrados en ella')
            return
        }

        setJourney(id)

        $('#MyConfirmationCloseJourney').modal('show')

    }
    const cerrarJornada=()=>{

        let data = {          
            status: 'Cerrada'   
        }
        
        dispatch(editJornada(data, journey))   
        $('#MyConfirmationCloseJourney').modal('hide')
    }



    ///juegos
    const newJuego =(j)=>{

        setJourney(j)
        setHora('')
        setMinuto('')

        let fechainicial = jornadas.filter(x=>x.id==j)[0].inicia.substring(0,10)
        setFecha(fechainicial)

        setEquipoA('')
        setEquipoB('')
        setGolesA(0)
        setGolesB(0)

    }

    const guardarJuego = (e) => {
        e.preventDefault()

        if (equipoA == '' || equipoB == '') {
            alert('No ha indicado los equipos')
            return
        }

        if (fecha == '' || hora == '' || minuto =='') {
            alert('No ha indicado la fecha, hora y minuto')
            return
        }

        if (equipoA ==  equipoB ) {
            alert('Has seleccionado el mismos equipo')
            return
        }

        
        let juegosjugados = []

        juegos.forEach(element => {

            let jj = {jornada: jornadas.filter(x=>  x.id == element.jornada )[0].nombre }

            if (element.equipoA == equipoA && element.equipoB == equipoB)               
                juegosjugados.push (jj)            

            if (element.equipoA == equipoB && element.equipoB == equipoA)
                juegosjugados.push (jj)
            
                
        });


        if( juegosjugados.length > 0){
            alert ('Este partido ya fue jugado en la ' + juegosjugados[0].jornada)
            return
        }


        
        let data = {
            torneo,            
            jornada: journey,
            fecha : fecha + ' 00:00:00',
            hora,
            minuto,
            equipoA,
            equipoB,
            golesA,
            golesB,
            status: 'Abierto'   
        }

        
        dispatch(addJuego(data))   
        

        $('#MyModalJuego').modal('hide')

    }



    const eliminarJuego = () => {                


        if(goles.filter(x=> x.juego == idJuego).length > 0){
            alert('Para eliminar el juego, necesitas  borrar los goles')
            return
        }


        $('#MyConfirmation').modal('show')
    }

    const eliminarRegistroJuego = () => {        

        dispatch(deleteJuego(idJuego))
        $('#MyConfirmation').modal('hide')        
        setIdJuego('')  
        setIdTeamA('')
        setIdTeamB('')
    }



    
    const estidisticas = (juego, jor) =>{

        setNombreJornada(jor.nombre)

        setIdJuego(juego.id)
        setStatusJuego(juego.status)
        setIdTeamA(juego.equipoA)
        setIdTeamB(juego.equipoB)

        let cad = ''

        cad = '' + equipos.filter(x=>x.id== juego.equipoA)[0].nombre 
        setNombreTeamA(cad)

        cad = '' + equipos.filter(x=>x.id== juego.equipoB)[0].nombre 
        setNombreTeamB(cad)     
        
    }


    //Goles
    const guardarGoles =(tipo)=>{

        if (tipo =='A'){
            if (jugadorA == '' ) {
                alert('No ha indicado el jugador')
                return
            }

            if (golA == 0 && amarillaA == 0 && rojaA == 0 ) {
                alert('al menos debe de registrar goles o tarjetas')
                return
            }

            if (goles.filter(x => x.juego == idJuego && x.equipo == idTeamA && x.jugador == jugadorA).length > 0){
                alert('Ese jugador ya fue registrado anteriormente en este partido')
                return
            }

            let data = {
                torneo,
                juego: idJuego,            
                equipo: idTeamA,
                jugador: jugadorA,
                goles: golA,
                tarjeta_amarilla: amarillaA,
                tarjeta_roja: rojaA            
            }            
            dispatch(addGol(data))   

            setJugadorA('')
            setGolA(0)
            setAmarillaA(0)
            setRojaA(0)
        }


        if (tipo =='B'){
            if (jugadorB == '' ) {
                alert('No ha indicado el jugador')
                return
            }

            if (golB == 0 && amarillaB == 0 && rojaB == 0 ) {
                alert('al menos debe de registrar goles o tarjetas')
                return
            }

            if (goles.filter(x => x.juego == idJuego && x.equipo == idTeamA && x.jugador == jugadorB).length > 0){
                alert('Ese jugador ya fue registrado anteriormente en este partido')
                return
            }



            let dataB = {
                torneo,
                juego: idJuego,            
                equipo: idTeamB,
                jugador: jugadorB,
                goles: golB,
                tarjeta_amarilla: amarillaB,
                tarjeta_roja: rojaB            
            }            
            dispatch(addGol(dataB))   

            setJugadorB('')
            setGolB(0)
            setAmarillaB(0)
            setRojaB(0)
        }


        
        
        
        
    }

    const eliminarGol = (id) => {
        dispatch(deleteGol(id))
    }


    const finalizarJuego = () => {        
        $('#MyConfirmationCloseJuego').modal('show')
    }


    const cerrarJuego = () => {        

        let xGolesA = 0
        let xGolesB = 0
        
        let registros = goles.filter(x => x.juego == idJuego)

        registros.forEach(element => {
            
            if (element.equipo == idTeamA)
                xGolesA = xGolesA + element.goles

            if (element.equipo == idTeamB)
                xGolesB = xGolesB + element.goles
        });


            
        let data = {        
            golesA: xGolesA,
            golesB: xGolesB,
            status: 'Finalizado'   
        }

        
        dispatch( editJuego(data,idJuego))   
        
        setStatusJuego('Finalizado')
        $('#MyConfirmationCloseJuego').modal('hide')

        
        


    }


    const sumagoles = (arreglo) => {

        let suma = 0


        arreglo.forEach(element => {
            suma = suma + element.goles 
        });
        
        

        
        return suma

    }


    const altaJugador = (equipo) => {        
        setEquipoAlta(equipo)
        $('#MyModalAddPlayer').modal('show')
    }

    

    const guardarAltaJugador = () => {
        let data = {
            nombre : nombreAlta,
            status: 'Alta', 
            torneo,
            equipo: equipoAlta           
        }

        
        dispatch(addJugador(data))
        setNombreAlta('')
        $('#MyModalAddPlayer').modal('hide')

    }


    const listatorneos = (
        <>
        <h5>Mis Torneos </h5>
    
        <table>
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
                    .filter(x => x.user_owner === auth.user.id)
                    .map(torneo=>(
                        <tr key={torneo.id}>
                            <td> <img src={torneo.imagen}  alt="imagen" width="100px" height="100px"/> </td>
                            <td>{torneo.nombre}</td>
                            <td> { estados.filter(x=>x.id == torneo.estado)[0].nombre } | {torneo.localidad}</td>                            
                            <td>
                                <button  onClick={() => {setTorneo(torneo.id); setNombreTorneo(torneo.nombre)}} className="btn btn-outline-success" >
                                    Jornadas
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
         


    const listaJornadas = (
        <>        
            <h5>{ nombreTorneo }</h5>
            
            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                regresar
            </button> 


            {
                jornadas.filter(x=>x.torneo == torneo && x.status == 'Abierta').length == 0
                ?(
                    <>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            data-toggle="modal"
                            data-target="#MyModal"
                            onClick={ () => { newJornada() } }
                            >
                            + Nueva Jornada
                        </button>
                    </>
                )
                :null
            }

            


            <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Jornada</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                        <form>                          

                            <div className="form-group">
                                <label>Nombre *</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre de la jornada"
                                    name="nombre"                                    
                                    onChange = { e => setNombre(e.target.value)  }
                                    value={nombre}   
                                    disabled="disabled"                                                                      
                                />
                            </div>
                           

                            <div className="form-group">
                                <label for="start">Inicia</label>
                                <input className="form-control"
                                    type="date"                                     
                                    name="inicia"
                                    value={inicia}
                                    min="2020-01-01" 
                                    max="2025-12-31" 
                                    onChange = { e => setInicia(e.target.value)  }                                    
                                    />
                            </div>
                            <div className="form-group">
                                <label for="start">Termina</label>
                                <input className="form-control"
                                    type="date"                                     
                                    name="termina"
                                    value={termina}
                                    min="2020-01-01" 
                                    max="2025-12-31" 
                                    onChange = { e => setTermina(e.target.value)  }                                    
                                    />
                            </div>
 
                            <div className="form-group">
                                <label>Aviso</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="por ejemplo: Balon del # 4"
                                    name="aviso"                                    
                                    onChange = { e =>setAviso(e.target.value)  }
                                    value={aviso}                                                                         
                                />
                            </div>

                          


                            
                        </form>
        
                    </div>
                    <div className="modal-footer">                        
                        <button type="button" className="btn btn-primary" onClick={guardar}>Guardar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
                </div>
            </div>




            <div className="modal fade" id="MyModalJuego" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Juego</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                        <form>                          


                        <div className="container">
                            <div className="row">
                                <div className="col-sm form-group">
                                    <label for="fecha">Fecha</label>
                                    <input className="form-control"
                                        type="date"                                     
                                        name="fecha"
                                        value={fecha}
                                        min="2020-01-01" 
                                        max="2025-12-31" 
                                        onChange = { e => setFecha(e.target.value)  }                                    
                                    />
                                </div>
                                <div className="col-sm form-group">
                                    <label>Hora </label>
                                    <select 
                                        className="form-control"
                                        name="hora"
                                        value={hora}
                                        onChange={ e=> setHora (e.target.value) } >                                       
                                        <option value=''>--</option>
                                        {listaHoras.map((x, ndx) => (
                                        <option key={x.ndx} value={x.hora}>
                                            {x.hora}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <div className="col-sm form-group">
                                    <label>Minuto </label>
                                    <select 
                                        className="form-control"
                                        name="minuto"
                                        value={minuto}
                                        onChange={ e=> setMinuto (e.target.value) } >
                                        <option value=''>--</option>                                        
                                        {listaMinutos.map((x, ndx) => (
                                        <option key={x.ndx} value={x.min}>
                                            {x.min}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm form-group">
                                    <label for="start">Equipo Local</label>
                                    <select 
                                        className="form-control"
                                        name="equipoA"
                                        value={equipoA}
                                        onChange={ e=> setEquipoA (e.target.value) } >
                                        <option value="">Seleccione...</option>                                
                                        {equipos
                                            .filter ( x => x.torneo == torneo)                                            
                                            .map((x) => (
                                        <option key={x.id} value={x.id}>
                                            {x.nombre}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                <div className="col-sm form-group">
                                    <label for="start">Equipo Visitante</label>
                                    <select 
                                        className="form-control"
                                        name="equipoB"
                                        value={equipoB}
                                        onChange={ e=> setEquipoB (e.target.value) } >
                                        <option value="">Seleccione...</option>                                
                                        {equipos
                                            .filter ( x => x.torneo == torneo)
                                            .map((x) => (
                                        <option key={x.id} value={x.id}>
                                            {x.nombre}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                             
                        </div>                              
                        </form>
        
                    </div>
                    <div className="modal-footer">                        
                        <button type="button" className="btn btn-primary" onClick={guardarJuego}>Guardar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
                </div>
            </div>



            <ul>
                {
                    jornadas
                    .filter(x=>x.torneo == torneo)
                    .map(
                        jornada => (
                            <li key={jornada.id} className="top-jornada">
                                {jornada.nombre} ({jornada.status})
                                <br/> Del {jornada.inicia.substring(8,10)}/{jornada.inicia.substring(5,7)}/{jornada.inicia.substring(0,4)} 
                                 { jornada.inicia == jornada.termina
                                    ? null 
                                    : (<> <br/> Al   {jornada.termina.substring(8,10)}/{jornada.termina.substring(5,7)}/{jornada.termina.substring(0,4)} </>)
                                   
                                 }
                                <table>
                                    <thead>
                                    <th width="10%">Fecha</th>
                                    <th width="5%"></th>
                                    <th width="5%">Hora</th>
                                    <th width="5%"></th>
                                    <th width="20%">Equipo A</th>
                                    <th width="6%">Goles</th>
                                    <th width="3%"></th>
                                    <th width="6%">Goles</th>                                                                        
                                    <th width="20%">Equipo B</th>                                    
                                    <th>  </th>
                                    <th width="10%">Status</th>                                    
                                                                        
                                    
                                    </thead>

                                    <tr>
                                    </tr>
                                    {
                                        juegos
                                        .filter(x=> x.torneo == torneo && x.jornada == jornada.id)
                                        .map(juego => (
                                            <tr key={Juego.id}  >
                                                <td>{juego.fecha.substring(0,10)}</td>
                                                <td> </td>
                                                <td>{juego.hora} : {juego.minuto}</td>
                                                <td> </td>
                                                <td>{ equipos.filter(x=> x.id == juego.equipoA)[0].nombre }</td>
                                                <td>{juego.golesA}</td>
                                                <td></td>
                                                <td>{juego.golesB}</td>
                                                <td>{ equipos.filter(x=> x.id == juego.equipoB)[0].nombre }</td>                                                
                                                <td>
                                                    <button  onClick={() =>  {  estidisticas (juego, jornada)  }  } className="btn btn-outline-success" >
                                                        ...Goles
                                                    </button>                                                                                    
                                                </td>
                                                <td>{juego.status}</td>
                                          
                                            </tr>
                                        ))
                                    }
                                </table>
                                

                                <div className="row top-3rem">
                                <div className="col-4">


                                    {
                                        jornadas.filter(x=>x.id == jornada.id)[0].status == 'Abierta'
                                        ?(
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success top-jornada"
                                                    data-toggle="modal"
                                                    data-target="#MyModalJuego"
                                                    onClick={ () => { newJuego(jornada.id) } }
                                                    >
                                                    + Nuevo Juego
                                                </button>
                                            </>
                                        )
                                        :null
                                    }

                                    
                                </div>
                                <div className="col-4">
                                    
                                    
                                    {
                                        juegos.filter(x=> x.torneo == torneo && x.jornada == jornada.id).length > 0  
                                        && juegos.filter(x=> x.torneo == torneo && x.jornada == jornada.id && x.status == 'Abierto').length == 0 
                                        && jornadas.filter(x=>x.id == jornada.id)[0].status == 'Abierta'
                                        ?(
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"                                                    
                                                    onClick={ () => { preCierreJornada(jornada.id) } }
                                                    >
                                                    Cerrar Jornada
                                                </button>
                                            </>
                                        )
                                        :null
                                    }
                                    
                                    
                                </div>
                                <div className="col-4">
                                    {
                                        juegos.filter(x=> x.torneo == torneo && x.jornada == jornada.id).length == 0                                          
                                        ?(
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"                                                    
                                                    onClick={ () => { eliminarJornada(jornada.id) } }
                                                    >
                                                    Eliminar Jornada
                                                </button>
                                            </>
                                        )
                                        :null
                                    }
                                </div>
                                
                            </div>
                                
                            </li>
                        )
                    )
                }
            </ul>





           
            <div className="modal fade" id="MyConfirmationCloseJourney" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mi Torneo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ¿Esta seguro de cerrar la jornada?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={cerrarJornada}>Si, si quiero cerrar la jornada</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Salir</button>
                    </div>
                    </div>
                </div>
            </div>


           


        </>

    )


    const detalles = (
        <>
            
            <h5>{ nombreTorneo }</h5>
            <h3>{ nombreJornada }</h3>
                
            <button  onClick={() => {setIdJuego('');  setIdTeamA('');  setIdTeamB('')}} className="btn btn-outline-success" >
                regresar
            </button> 


            {
                    statusJuego == 'Finalizado'
                        ? null
                        : (
                            <>
                                <button  onClick={() => eliminarJuego()} className="btn btn-outline-danger" >
                                    Eliminar Juego
                                </button>                                                                        
                                <button  onClick={() => finalizarJuego()} className="btn btn-outline-success" >
                                        Finalizar Partido
                                    </button>                                                                        
                            </>

                        )
                }

            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3>{nombreTeamA}</h3>
                        <h4> 
                            { sumagoles (goles.filter(x => x.juego == idJuego && x.equipo == idTeamA))}                        
                        </h4>

                        
                        
                        <table>
                            <thead>                
                                <th width="5%"> </th>
                                <th width="20%">Jugador</th>
                                <th width="10%">Goles</th>                
                                <th width="10%">T-Amarillas</th>
                                <th width="10%">T-Roja</th>
                                <th width="10%"> </th>                
                            </thead>     
                            <tbody>

                            {
                                statusJuego == 'Finalizado'
                                    ? null
                                    : (

                                        <tr>
                                            <td>

                                               {   
                                                statusJuego == 'Finalizado'
                                                    ? null
                                                    : 
                                                        <button  onClick={() => altaJugador(idTeamA)} className="btn btn-outline-success" >
                                                            + 
                                                        </button>                                                                        
                                                }
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="jugadorA"
                                                    value={jugadorA}
                                                    onChange={ e=> setJugadorA (e.target.value) } >
                                                    <option value="null">Jugador</option>                                
                                                    { jugadores
                                                        .filter(x => x.equipo == idTeamA )                                                
                                                        .map( (x, ndx) => (
                                                        <option key={ndx} value={x.id}>
                                                            {x.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="golA"
                                                    value={golA}
                                                    onChange={ e=> setGolA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>

                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="amarillaA"
                                                    value={amarillaA}
                                                    onChange={ e=> setAmarillaA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>                                                                        
                                                </select>                                    

                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="rojaA"
                                                    value={rojaA}
                                                    onChange={ e=> setRojaA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>                                        
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-primary" onClick={ () => { guardarGoles('A') }}>agregar</button>
                                            </td>
                                            
                                        </tr>

                                    )
                            }

                            



                                {
                                    goles
                                    .filter(x => x.juego == idJuego && x.equipo == idTeamA)
                                    .map( (gol, ndx)=>(
                                        <tr key={gol.id}>                            
                                            <td>

                                                {
                                                    statusJuego == 'Finalizado'
                                                        ? null
                                                        : (
                                                            <button  onClick={() => eliminarGol(gol.id)} className="btn btn-outline-danger" >
                                                                <span className="fa fa-trash" aria-hidden="true"></span>
                                                            </button>
                                                        )
                                                }


                                                                                    
                                            </td>
                                            <td> { jugadores.filter(x=>x.id == gol.jugador)[0].nombre }  </td>
                                            <td> { gol.goles }</td>                            
                                            <td> { gol.tarjetas_amarillas }</td>                            
                                            <td> { gol.tarjeta_roja }</td>                            
                                            <td></td>
                                           
                                        </tr>
                                    ))
                                }


                                
                                            
                            </tbody>
                        </table>
                        

                    
                    </div>

                    

                    <div className="col-6">
                        <h3>{nombreTeamB}</h3>
                        <h4> 
                            { sumagoles (goles.filter(x => x.juego == idJuego && x.equipo == idTeamB))}                        
                        </h4>
                        
                        

                                                                                     
                        <table>
                            <thead>                
                                <th width="5%"> </th>
                                <th width="20%">Jugador</th>
                                <th width="10%">Goles</th>                
                                <th width="10%">T-Amarillas</th>
                                <th width="10%">T-Roja</th>
                                <th width="10%"> </th>                
                            </thead>     
                            <tbody>

                            {
                                statusJuego == 'Finalizado'
                                    ? null
                                    : (

                                        <tr>
                                            <td>
                                                {   
                                                    statusJuego == 'Finalizado'
                                                        ? null
                                                        : 
                                                            <button  onClick={() => altaJugador(idTeamB)} className="btn btn-outline-success" >
                                                                +
                                                            </button>           
                                                }
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="jugadorB"
                                                    value={jugadorB}
                                                    onChange={ e=> setJugadorB (e.target.value) } >
                                                    <option value="null">Jugador</option>                                
                                                    { jugadores  
                                                        .filter(x => x.equipo == idTeamB )                                              
                                                        .map( (x, ndx) => (
                                                        <option key={ndx} value={x.id}>
                                                            {x.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="golB"
                                                    value={golB}
                                                    onChange={ e=> setGolB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>

                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="amarillaB"
                                                    value={amarillaB}
                                                    onChange={ e=> setAmarillaB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>                                                                        
                                                </select>                                    

                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="rojaB"
                                                    value={rojaB}
                                                    onChange={ e=> setRojaB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>                                        
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-success" onClick={ () => { guardarGoles('B') }}>agregar</button>
                                            </td>
                                            
                                        </tr>
                                    )
                            }

                            



                                {
                                    goles
                                    .filter(x => x.juego == idJuego && x.equipo == idTeamB)
                                    .map( (gol, ndx)=>(
                                        <tr key={ndx}>                            
                                            <td>
                                                {
                                                    statusJuego == 'Finalizado'
                                                    ? null
                                                    : (
                                                        <button  onClick={() => eliminarGol(gol.id)} className="btn btn-outline-danger" >
                                                            <span className="fa fa-trash" aria-hidden="true"></span>
                                                        </button>                                    
                                                    )
                                                }
                                            </td>
                                            <td> { jugadores.filter(x=>x.id == gol.jugador)[0].nombre }  </td>
                                            <td> { gol.goles }</td>                            
                                            <td> { gol.tarjetas_amarillas }</td>                            
                                            <td> { gol.tarjeta_roja }</td>                            
                                            <td></td>
                                        </tr>
                                    ))
                                }


                            
                                            
                            </tbody>
                        </table>
                  



                    </div>
                </div>


                

                
            </div>

        


            <div className="modal fade" id="MyConfirmationCloseJuego" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mi Torneo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Una vez finalizado el juego ya no se podrá editar el juego y los goles; ¿Esta seguro de cerrar el juego?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={ () => { cerrarJuego() }}>Si, Finalizarlo...</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Salir</button>
                    </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="MyConfirmation" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mi Torneo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ¿Esta seguro de eliminar el juego?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={eliminarRegistroJuego}>Eliminar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>

    


            <div className="modal fade" id="MyModalAddPlayer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Registrar Jugador en el Equipo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                    <form>
                        <input 
                            type="text"
                            placeholder="Nombre completo"
                            name="nombreAlta"
                            value={nombreAlta}
                            onChange={ e => setNombreAlta (e.target.value)}
                        />   
                
                    </form>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={ () => { guardarAltaJugador () }}>Registrar Alta</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Salir</button>
                    </div>
                    </div>
                </div>
            </div>




        </>
    )





    return (
        <>
            {
                torneo == ''
                    ? listatorneos
                    : idJuego == ''
                        ? listaJornadas
                        : detalles
            }
        </>
    )
}

export default Juego
