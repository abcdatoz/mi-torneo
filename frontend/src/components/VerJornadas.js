import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const VerJornadas = (props) => {

    const [listaJornadas, setListaJornadas] = useState([])
    const [filtro, setFiltro] = useState('')

    //selectors    
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    
    
    
    
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
                                <td>{subitem.golesB} </td>
                                <td>{subitem.equipoB} </td>                            
                                
                            </tr>
                        ))
                    
                

                )
            }

            </tbody>
            </table>




            </>
    )

}


export default VerJornadas