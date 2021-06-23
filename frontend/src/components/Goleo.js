import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'


const Goleo = (props) => {

    
    const [tablaGoleo, setTablaGoleo] = useState([])


    const equipos = useSelector(state => state.equipos.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    const goles = useSelector(state => state.goles.lista)


    useEffect( () => {        
        generarGoleo()
    },[])

    const generarGoleo = () => {

        let arr = []
        let goleadores = jugadores.filter(x=>x.torneo == props.idTorneo)
        

        goleadores.forEach(goleador => {
            let ngoles = 0    


            let golesJugador = goles.filter(x=>x.jugador == goleador.id)

            golesJugador.forEach(registro => {
                ngoles = ngoles + registro.goles
            });
            
            let obj = {
                equipo: equipos.filter(x=>x.id == goleador.equipo)[0].nombre,
                jugador: goleador.nombre,
                ngoles
            }

            arr.push(obj)
        });

        arr.sort((a,b) => b.ngoles - a.ngoles) 

        
        let arrgoleo = []
        let i = 0
        
        arr.forEach(element => {
            i++

            if (i < 11){
                arrgoleo.push(element)
            }


            
        });


        setTablaGoleo(arrgoleo)        

    }




    return (
        <table className="table table-striped">
                <thead>
                <th width="5%">#</th>
                <th width="25%">Equipo</th>
                <th width="25%">Jugador</th>
                <th width="25%">Goles</th>                           
                
                </thead>

                <tbody>
                {
                    tablaGoleo
                    .map((item,ndx) => (
                        <tr key={ndx}  >
                            <td>{ndx + 1}</td>
                            <td>{item.equipo}</td>
                            <td>{item.jugador} </td>
                            <td>{item.ngoles} </td>                            
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )



}


export default Goleo