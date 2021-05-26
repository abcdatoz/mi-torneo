import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../actions/TorneoActions'
import { getJornadas, addJornada, editJornada,deleteJornada } from '../actions/JornadaActions'







const Juegos = () => {

    //useStates
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')


    const [nombre, setNombre] = useState('')
    const [inicia, setInicia] = useState('')
    const [termina, setTermina] = useState('')
    const [aviso, setAviso] = useState('')
    

    //use selectors
    const auth = useSelector(state => state.auth)    
    const torneos = useSelector(state => state.torneos.lista)

    //use dispatch
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getTorneos())
    },[])




    const addJornada = (e) => {
        e.preventDefault()

        if (nombre ==''){
            alert('No ha capturado el nombre de la jornada')
            return
        }


        let data = {
            torneo,            
            nombre,
            inicia,
            termina,
            aviso,
            status: 'abierta'   
        }

        
        dispatch(addJornada(data))       
        
        
        $('#MyModal').modal('hide')


    }



    const listatorneos = (
        <>
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
                                    Juegos
                                </button>                                             
                            
                            </td>
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

            <button
                type="button"
                className="btn btn-outline-success"
                data-toggle="modal"
                data-target="#MyModal"
                onClick={ () => { agregar(); setGrupo(grupo.id); } }
                >
                + Nueva Jornada
            </button>


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
                                />
                            </div>

                           
                            <div className="input-group date" data-provide="datepicker">
                                <input type="text" className="form-control" />
                                <div class="input-group-addon">
                                    <span className="glyphicon glyphicon-th"></span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Termina</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="termina"
                                    value={termina}
                                    onChange={e =>  setTermina(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Aviso</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Aviso"
                                    name="aviso"                                    
                                    onChange = { e =>setAviso(e.target.value)  }
                                    value={aviso}                                                                         
                                />
                            </div>

                          


                            
                        </form>
        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={addJornada}>Guardar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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
                    : listaJornadas
            }
        </>
    )
}

export default Juegos
