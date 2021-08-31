import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const VerJornadas = (props) => {

    const [listaJornadas, setListaJornadas] = useState([])
    const [filtro, setFiltro] = useState('')

    //selectors    
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const goles = useSelector(state => state.goles.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    
    const [arrGolesA, setArrGolesA] = useState([])
    const [arrGolesB, setArrGolesB] = useState([])
    const [teamA, setTeamA] = useState('')
    const [teamB, setTeamB] = useState('')
    
    
    const generarDatos = () =>{

        let journeys = jornadas.filter(x=>x.torneo == props.idTorneo && x.status == 'Cerrada')        
        let teams = equipos.filter(x=>x.torneo == props.idTorneo)

        let grandMother = []

        journeys.forEach(element => {

            let arr = []
            let matches = juegos.filter(x=>x.jornada == element.id)
        
            matches.forEach(match => {
                 

                let obj = {
                    id: match.id,
                    equipoA:  teams.filter(x => x.id == match.equipoA)[0].nombre,
                    equipoB:  teams.filter(x => x.id == match.equipoB)[0].nombre,
                    golesA: match.golesA,
                    golesB: match.golesB,                    
                    status: match.status
                }

                arr.push(obj)

                
            });

        
            

            let subdata = {
                jornada: element.nombre,
                juego: arr
            }

            grandMother.push(subdata)

            
        });
        

        setListaJornadas(grandMother)

    }
    
    //useEffect
    useEffect( () => {        
        generarDatos()
    },[])

    const mostrarModal = (id) => {
        $('#MyModal').modal('show')

        let match = juegos.filter(x => x.id == id)

        let arr = goles.filter(x => x.juego == id && x.equipo == match[0].equipoA && x.goles > 0 )
        let arr2 =[]
        arr.forEach(element => {
            let player = jugadores.filter(x => x.id == element.jugador)             
            let obj = {
                id: element.jugador,
                nombre: player[0].nombre,
                goles: element.goles
            }
            arr2.push(obj)
        });

        

        setTeamA( equipos.filter(x=>x.id == match[0].equipoA)[0].nombre )
        setArrGolesA(arr2)

        arr = []
        arr2 = []
        arr = goles.filter(x => x.juego == id && x.equipo == match[0].equipoB && x.goles > 0 )
        arr.forEach(element => {
            let player = jugadores.filter(x => x.id == element.jugador)             
            let obj = {
                id: element.jugador,
                nombre: player[0].nombre,
                goles: element.goles
            }
            arr2.push(obj)
        });


        setTeamB( equipos.filter(x=>x.id == match[0].equipoB)[0].nombre )
        setArrGolesB(arr2)

    }
        
    return (
        <>

        <div>            
            <input 
                    type="text"
                    placeholder="filtrar por equipo"
                    name="filtro"
                    value={filtro}
                    onChange={ e => setFiltro(e.target.value)}
                />   
        </div>


        <table className="table table-striped" >
                <thead>
                    <tr>
                        <th width="10%"></th>
                        <th width="10%"></th>
                        <th width="25%"></th>
                        <th width="5%"></th>                
                        <th width="5%"></th>
                        <th width="25%"></th>                
                        
                    </tr>
                </thead>

        <tbody>

            {
                listaJornadas
                .map((item, ndx) => 

                
                    
                        listaJornadas[ndx].juego
                        .filter (x => x.equipoA.toUpperCase().includes(filtro.toUpperCase()) 
                                || x.equipoB.toUpperCase().includes(filtro.toUpperCase()))                    
                        .map((subitem,indx) => (
                            <tr key={subitem.id}  >
                                <td> {item.jornada}  </td>
                                <td>{indx + 1}</td>
                                <td>{subitem.equipoA}</td>
                                <td>{subitem.golesA} </td>                            
                                <td><span className="fa fa-soccer-ball-o" aria-hidden="true" onClick={() =>  mostrarModal(subitem.id)} > </span> </td>                                        
                                <td>{subitem.golesB} </td>
                                <td>{subitem.equipoB} </td>                            
                                
                            </tr>
                        ))
                    
                

                )
            }

            </tbody>
            </table>





            <div className="modal fade" id="MyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Goles</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                       <h5>{teamA}</h5>

                       <table >
                        <thead>
                            <tr>
                            <th width="20%"></th>
                            <th width="50%"></th>
                            <th width="10%"></th>                        
                            </tr>
                        </thead>

                        <tbody>
                        {
                            arrGolesA
                            .map((item) => (
                                <tr key={item.id}  >                                    
                                    <td></td>
                                    <td>{item.nombre}</td>
                                    <td>{item.goles} </td>                            
                                </tr>
                            ))                            
                        }
                        </tbody>
                        </table>


                       <h5>{teamB}</h5>
                       <table  >
                        <thead>
                            <tr>
                            <th width="20%"></th>
                            <th width="50%"></th>
                            <th width="10%"></th>                        
                            </tr>
                        </thead>

                        <tbody>
                        {
                            arrGolesB
                            .map((item) => (
                                <tr key={item.id}  >                                    
                                    <td></td>
                                    <td>{item.nombre}</td>
                                    <td>{item.goles} </td>                            
                                </tr>
                            ))                            
                        }
                        </tbody>
                        </table>
        
                    </div>
                    <div className="modal-footer">                        
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>




            </>
    )

}


export default VerJornadas