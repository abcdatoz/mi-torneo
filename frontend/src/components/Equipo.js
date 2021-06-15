import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../actions/TorneoActions'
import {getGrupos} from '../actions/GrupoActions'
import {getEquipos, addEquipo, editEquipo, deleteEquipo} from '../actions/EquipoActions'
import {getJugadores, addJugador,editJugador,deleteJugador} from '../actions/JugadorActions'


const Equipo = () => {

    //useStates

    
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')
    const [grupo, setGrupo] = useState('')
    const [nombre, setNombre] = useState('')
    const [nombreContacto, setNombreContacto] = useState('')
    const [correoContacto, setCorreoContacto] = useState('')
    const [telefonoContacto, setTelefonoContacto] = useState('')    
    const [status, setStatus] = useState('')
    const [mode, setMode] = useState('new')
    const [id, setId] = useState('')

    
    const [idGrupo, setIdGrupo] = useState('')
    const [nombreGrupo, setNombreGrupo] = useState('')

    const [idEquipo, setIdEquipo] = useState('')
    const [nombreEquipo, setNombreEquipo] = useState('')


    const [jugadorNombre, setJugadorNombre] = useState('')
    const [jugadorStatus, setJugadorStatus] = useState('Alta')
    const [jugadorId, setJugadorId] = useState('')


    //useSelectors
    const auth = useSelector(state => state.auth)    
    const torneos = useSelector(state => state.torneos.lista)
    const grupos = useSelector(state => state.grupos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const jugadores = useSelector(state => state.jugadores.lista)

    //useDispatch
    const dispatch = useDispatch()

    

    useEffect(()=>{        
        dispatch(getTorneos())
        dispatch(getGrupos())
        dispatch(getEquipos())
        dispatch(getJugadores())                
    },[])

    const agregar = () => {
        setMode('new')
        
        setGrupo('')
        setNombre('')
        setNombreContacto('')
        setCorreoContacto('')
        setTelefonoContacto('')
        setStatus('alta')
    }

    const editar = (item) => {
        setMode('edit')
        
        setGrupo(item.grupo)
        setNombre(item.nombre)
        setNombreContacto(item.nombre_contacto)
        setCorreoContacto(item.correo_contacto)
        setTelefonoContacto(item.telefono_contacto)
        setStatus(item.status)
        setId(item.id)        
        $('#MyModal').modal('show')
    }


    const agregarJugador = () =>{

        if (jugadorNombre == '') {
            alert('No ha capturado el nombre del jugador')
            return
        }
 

        let data = {
            nombre : jugadorNombre,
            status: jugadorStatus, 
            torneo,
            equipo: idEquipo           
        }

        if (jugadorId == '')
            dispatch(addJugador(data))
            

        if (jugadorId != '')        
            dispatch(editJugador(data,jugadorId))
            
        


        setJugadorId('')
        setJugadorNombre('')
        setJugadorStatus('Alta')
    }

    const editarJugador =(item)=>{
        setJugadorId(item.id)
        setJugadorNombre(item.nombre)
        setJugadorStatus(item.status)
    }
  
    const eliminarJugador = (item) =>{
        dispatch(deleteJugador(item.id))
    }




    const guardar = (e) => {
        e.preventDefault()

        if (nombre == '') {
            alert('No ha capturado el nombre del equipo')
            return
        }
 
        let data = {
            torneo,
            grupo,
            nombre,
            nombreContacto,
            correoContacto,
            telefonoContacto,
            status    
        }

        if (mode == 'new')
            dispatch(addEquipo(data))       
        
        if(mode == 'edit')
            dispatch(editEquipo(data, id))
        
        $('#MyModal').modal('hide')

    }
 

    const eliminar = (item) => {

        let lista = jugadores.filter(x=> x.equipo === item.id)

        if (lista.length > 0){
            alert('No se puede eliminar este equipo porque tiene jugadores registrados')
            return
        }


        setId(item.id)                
        $('#MyConfirmation').modal('show')        
    }

    const eliminarRegistro = () => {        
        dispatch(deleteEquipo(id))
        $('#MyConfirmation').modal('hide')        
    }





    const listatorneos = (<>
        <h5>Mis Torneos </h5>

        <table>
            <thead>
                <th width="10%"></th>
                <th width="50%">Nombre</th>
                <th width="10%">Localidad</th>
                <th width="10%">status</th>
                <th width="10%">Equipos</th>                
            </thead>     
            <tbody>
                {
                    torneos
                    .filter(x => x.user_owner === auth.user.id)
                    .map(torneo=>(
                        <tr key={torneo.id}>
                            <td> <img src={torneo.imagen}  alt="imagen" width="100px" height="100px"/> </td>
                            <td>{torneo.nombre}</td>
                            <td>{torneo.localidad}</td>
                            <td>{torneo.status}</td>
                            <td>
                                <button  onClick={() => {setTorneo(torneo.id); setNombreTorneo(torneo.nombre)}} className="btn btn-outline-success" >
                                    Ver Equipos
                                </button>                                             
                            
                            </td>
                        </tr>
                    ))
                }
                            
            </tbody>
            </table>

    </>)


   


    const listaEquipos = (
        <>        
            <h5>{ nombreTorneo }</h5>
            
            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                regresar
            </button> 




            


        <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Equipo</h5>
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
                                    placeholder="Nombre del equipo"
                                    name="nombre"                                    
                                    onChange = { e => setNombre(e.target.value)  }
                                    value={nombre}                                                                         
                                />
                            </div>

                            <div className="form-group">
                                <label>Representante</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre del representante"
                                    name="nombreContacto"                                    
                                    onChange = { e => setNombreContacto(e.target.value)  }
                                    value={nombreContacto}                                                                         
                                />
                            </div>

                            <div className="form-group">
                                <label>Correo del Representante</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Correo del representante"
                                    name="correoContacto"                                    
                                    onChange = { e => setCorreoContacto(e.target.value)  }
                                    value={correoContacto}                                                                         
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono Representante</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Teléfono del representante"
                                    name="telefonoContacto"                                    
                                    onChange = { e => setTelefonoContacto(e.target.value)  }
                                    value={telefonoContacto}                                                                         
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select 
                                        className="form-control"
                                        name="status"
                                        value={status}
                                        onChange={ e=> setStatus (e.target.value) } >
                                        <option value="alta">Alta</option>                                
                                        <option value="baja">Baja</option>                                        
                                    </select>
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
                    ¿Esta seguro de eliminar el equipo?
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={eliminarRegistro}>Eliminar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                
                
                </div>
            </div>
        </div>


        <table className="table table-striped">
            
            <tbody>

            {                    
                grupos
                .filter(x => x.torneo_owner === torneo)
                .map(grupo=>(
                    <tr key={grupo.id}>
                        <td width="20%">
                            {grupo.nombre} <br/>
                            <button
                                type="button"
                                className="btn btn-outline-success"
                                data-toggle="modal"
                                data-target="#MyModal"
                                onClick={ () => { agregar(); setGrupo(grupo.id); } }
                                >
                                + Nuevo Equipo
                            </button>

                        </td>
                        <td width="70%">
                            <table>
                            <thead>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Status</th>
                                <th>Representante</th>
                                <th>info</th>                                                    
                                <th> </th> 
                            </thead>     
                                <tbody>
                            {
                                equipos
                                .filter(x=> x.grupo === grupo.id)
                                .map((equipo, indx)=>(
                                    <tr key={equipo.id}>
                                        <td> {indx + 1} </td>
                                        <td>{equipo.nombre}</td>
                                        <td>{equipo.status}</td>
                                        <td>{equipo.nombre_contacto}</td>
                                        <td>Tel:{equipo.telefono_contacto} | Correo: {equipo.correo_contacto}</td>                                        
                                        <td>

                                            <button  onClick={() => {setIdEquipo(equipo.id); setNombreEquipo(equipo.nombre)}} className="btn btn-outline-success" >
                                                jugadores
                                            </button>   

                                            <button  onClick={() => editar(equipo)} className="btn btn-default btn-sm" >
                                                <span className="fa fa-edit" aria-hidden="true"></span>
                                            </button>
                                        
                                            <button  onClick={() => eliminar(equipo)} className="btn btn-default btn-sm" >
                                                <span className="fa fa-trash" aria-hidden="true"></span>
                                            </button>                                                
                                        
                                        </td>
                                    </tr>
                                ))
                            }
                            
                            </tbody>
                            </table>

                        </td>
                    </tr>
                ))
            }

        </tbody>
        </table>



 
        







        </>
    )









    const listaJugadores = (
        <>
            <h5>{nombreEquipo}</h5>
            <button  onClick={() => {setIdEquipo(''); setNombreEquipo('')}} className="btn btn-outline-success" >
                regresar
            </button> 


            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Status</th>                
                    <th> </th> 
                </thead>     
                <tbody>

                    <tr>
                        <td></td>
                        <td>
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Nombre del jugador"
                                name="jugadorNombre"                                    
                                onChange = { e => setJugadorNombre(e.target.value)  }
                                value={jugadorNombre}                                                                         
                            />
                        </td>
                        <td>
                                <select className="form-control"
                                    name="status"
                                    value={jugadorStatus}
                                    onChange={ e=> setJugadorStatus (e.target.value) } >
                                    <option value="Alta">Alta</option>                                
                                    <option value="Baja">Baja</option>                                        
                                </select> 

                        </td>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={agregarJugador}>Agregar</button>
                        </td>
                        
                    </tr>

                {                    
                    jugadores
                    .filter(x => x.equipo === idEquipo)
                    .map((player, ndx) =>(
                        <tr key={player.id}>
                            <td>{ndx+1} </td>
                            <td>{player.nombre} </td>
                            <td>{player.status} </td>
                            <td>
                                <button  onClick={() => editarJugador(player)} className="btn btn-default btn-sm" >
                                    <span className="fa fa-edit" aria-hidden="true"></span>
                                </button>
                            
                                <button  onClick={() => eliminarJugador(player)} className="btn btn-default btn-sm" >
                                    <span className="fa fa-trash" aria-hidden="true"></span>
                                </button>                                                                        
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>        
           
        </>
    )


    

    return (
        <>
            {
                torneo == ''
                    ? listatorneos
                    :   idEquipo == '' 
                        ? listaEquipos 
                        : listaJugadores
            }
        </>
    )
}


export default Equipo