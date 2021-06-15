import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos, addTorneo,editTorneo,deleteTorneo} from '../actions/TorneoActions'
import {getGrupos, addGrupo, deleteGrupo} from '../actions/GrupoActions'
import {getEquipos} from '../actions/EquipoActions'
import {getEstados} from '../actions/EstadoActions'

const Torneo = () => {

    //useStates
    const [nombre, setNombre] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [imagen, setImagen] = useState('')
    const [estado, setEstado] = useState('')
    const [mode, setMode] = useState('new')
    const [id, setId] = useState('')

    const [nombreGrupo, setNombreGrupo] = useState('')    

    

    //useSelectors
    const auth = useSelector(state => state.auth)
    const estados = useSelector(state => state.estados.lista)
    const torneos = useSelector(state => state.torneos.lista)
    const grupos = useSelector(state => state.grupos.lista)
    const equipos = useSelector(state => state.equipos.lista)

    //useDispatch
    const dispatch = useDispatch()

    

    useEffect(()=>{
        dispatch(getEstados())
        dispatch(getTorneos())
        dispatch(getGrupos())
        dispatch(getEquipos())
                
    },[])

    const agregar = () => {
        setMode('new')
        setNombre('')
        setLocalidad('')
        setImagen('')
        setEstado('')
    }
    const editar = (item) => {
        setMode('edit')
        setNombre(item.nombre)
        setLocalidad(item.localidad)
        setEstado(item.estado)
        setId(item.id)        
        $('#MyModal').modal('show')
    }



    const guardarGrupo = (e) =>{        
        e.preventDefault()
        
        let grupo = {
            nombre: nombreGrupo,
            torneo:  id
        }

        dispatch(addGrupo(grupo))
        setNombreGrupo('')
        $('#MyGroups').modal('hide')
    }


    const eliminarGrupo = (grupo)=> {

        let lista = equipos.filter(x=> x.grupo === grupo)

        if (lista.length > 0){
            alert('No se puede eliminar este grupo porque tiene equipos registrados')
            return
        }
            
        dispatch(deleteGrupo(grupo))

    }


    const guardar = (e) => {
        e.preventDefault()

        if (nombre == '' || localidad == '' || imagen=='' || estado=='') {
            alert('No ha capturado todos los campos')
            return
        }

        let formdata = new FormData()

        formdata.append('localidad', localidad)
        formdata.append('nombre', nombre)
        formdata.append('estado', estado)
        
        
        if (imagen){            
            formdata.append('imagen', imagen, imagen.name)
            formdata.append('llevaimagen', 1)
        }else{            
            formdata.append('llevaimagen', 0)
        }
        
        formdata.append('user', auth.user.id)

        if (mode == 'new')

            
            
            dispatch(addTorneo(formdata))       
        
        if(mode == 'edit')
            dispatch(editTorneo(formdata, id))
        
        $('#MyModal').modal('hide')

    }

    const eliminar = (item) => {

        let lista = grupos.filter(x=> x.torneo === item.id)

        if (lista.length > 0){
            alert('No se puede eliminar este torneo porque tiene grupos registrados')
            return
        }



        setId(item.id)        
        $('#MyConfirmation').modal('show')
    }

    const eliminarRegistro = () => {        
        dispatch(deleteTorneo(id))
        $('#MyConfirmation').modal('hide')        
    }

    const nombreEstado = (id)=>{
        let arr = estados.filter(x=>x.id == id)

        if (arr.length > 0)
            return arr[0].nombre
        
            return ' '
    }


    return (
        <>
        <h2>Torneos</h2>
        

        <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#MyModal"
            onClick={agregar}
            >
            + Nuevo
        </button>


        <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Registro</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                        <form>


                            <div className="form-group">
                                    <label>Estado   </label>
                                    <select 
                                        className="form-control"
                                        name="estado"
                                        value={estado}
                                        onChange={ e=> setEstado (e.target.value) } >
                                        <option value="null">Estado</option>                                
                                        {estados.map(x => (
                                        <option key={x.id} value={x.id}>
                                        {x.nombre}
                                        </option>
                                    ))}
                                    </select>
                            </div>

                            <div className="form-group">
                                <label>Localidad</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Localidad donde se juega el torneo"
                                    name="localidad"                                    
                                    onChange = { e => setLocalidad(e.target.value)  }
                                    value={localidad}                                                                         
                                />
                            </div>

                            <div className="form-group">
                                <label>*Nombre</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre del torneo"
                                    name="nombre"                                    
                                    onChange = { e => setNombre(e.target.value)  }
                                    value={nombre}                                                                         
                                />
                            </div>

                            <div className="form-group">
                                <label>*Imagen</label>
                                <input 
                                    className="form-control"
                                    type="file"
                                    name="imagen"
                                    accept="image/png, image/jpeg"
                                    onChange = { e => setImagen(e.target.files[0])}
                                    required
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

                                         
        <table className="table table-striped">
            <thead>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Localidad</th>                    
                <th>Nombre</th>
                <th>estatus</th>     
                <th></th>
                <th>Grupos</th> 
                <th> </th> 
            </thead>     
            <tbody>
                {                    
                    torneos
                    .filter(x => x.user_owner === auth.user.id)
                    .map(item=>(
                        <tr key={item.id}>
                            <td><img src={item.imagen}  alt="imagen" width="120px" height="120px"/> </td>
                            <td> { nombreEstado(item.estado) } </td>
                            <td>{item.localidad}</td>
                            <td>{item.nombre}</td>
                            <td>{item.status}</td>                             

                            <td><button
                                    type="button"
                                    className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#MyGroups"
                                    onClick={() => setId(item.id)}
                                    >
                                    + Grupo
                                </button></td>

                            <td>
                                <table>
                                    <tbody>
                                        {
                                            grupos
                                            .filter(x => x.torneo_owner === item.id)
                                            .map(grupo => (
                                                <tr key={grupo.id}>                                                    
                                                    <td>
                                                        <button  onClick={() => eliminarGrupo(grupo.id)} className="btn btn-outline-danger" >
                                                            <span className="fa fa-trash" aria-hidden="true"></span>
                                                        </button>                                    
                                                    </td>
                                                    <td>{grupo.nombre}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                            
                            </td>                             
                            
                            <td>                                
                                <button  onClick={() => editar(item)} className="btn btn-default btn-lg" >
                                    <span className="fa fa-edit" aria-hidden="true"></span>
                                </button>
                            
                                <button  onClick={() => eliminar(item)} className="btn btn-default btn-lg" >
                                    <span className="fa fa-trash" aria-hidden="true"></span>
                                </button>                                    

                            </td>
                        </tr>
                    ))
                }                               

            </tbody>
        </table>
                




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
                    ¿Esta seguro de eliminar el registro?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={eliminarRegistro}>Eliminar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>


        <div className="modal fade" id="MyGroups" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">            
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Agregar Grupo</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                <form>                     

                    <div className="form-group">
                        <label>Nombre del Grupo</label>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="Nombre del grupo"
                            name="nombreGrupo"                                    
                            onChange = { e => setNombreGrupo(e.target.value)  }
                            value={nombreGrupo}                                                                         
                        />
                    </div>                    


                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={guardarGrupo}>Guardar</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                </div>
                </div>
            </div>
        </div>



    </>
    )
}


export default Torneo