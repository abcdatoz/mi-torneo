import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const TablaGeneral = (props) => {

    const [tablaGen, setTablaGen] = useState([])

    //selectors    
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    
    
    const crearTablaGeneral = (idTorneo) =>{

        let teams = equipos.filter(x=>x.torneo == idTorneo)
        
        let arr = []
        
        teams.forEach(team => {
            let puntos = 0
            let golesAfavor = 0
            let golesEnContra = 0
            let jj = 0
            let jg = 0
            let jp = 0
            let je = 0

            

            let games = juegos.filter(x=>x.equipoA == team.id && x.status == 'Finalizado')
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

            games = juegos.filter(x=>x.equipoB == team.id && x.status == 'Finalizado')
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
    
    //useEffect
    useEffect( () => {        
        crearTablaGeneral(props.idTorneo)
    },[])




    return (
        <table className="table table-striped">
                <thead>
                <th width="5%">#</th>
                <th width="25%">Equipo</th>
                <th width="5%">JJ</th>
                <th width="5%">JG</th>
                <th width="5%">JP</th>
                <th width="5%">JE</th>                
                <th width="5%"></th>                
                <th width="5%">Puntos</th>                     
                <th width="5%"></th>                
                <th width="5%">GF</th>
                <th width="5%">GC</th>
                <th width="5%">Dif</th>
                
                
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
                            <td>{item.puntos} </td>                                                                                
                            <td> </td>
                            <td>{item.golesAfavor} </td>
                            <td>{item.golesEnContra} </td>
                            <td>{item.diferencia} </td>
                            
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )

}


export default TablaGeneral