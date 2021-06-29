import React,{  useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { getVisitas } from '../actions/VisitaActions'



const LandingPage = () => {

    const visitas = useSelector(state => state.visitas.lista)

    //use dispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect( () => {
        dispatch(getVisitas())           
    },[])





    return(
        <div >
            

            <table className="table table-striped">
                <thead>                
                <th>#</th>
                <th>city</th>
                <th>region</th>
                <th>torneo</th>
                <th>acceso</th>
            </thead>

            <tbody>
            {
                    visitas.map((item, ndx) => (
                        <tr key={item.id}  >                                                     

                            <td>{ visitas.length -ndx }</td>
                            <td>{item.city} </td>
                            <td>{item.region} </td>
                            <td>{item.torneo} </td>
                            <td>{item.created_at} </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            
            <br/>
            <a href="/#/login">Entrar</a>

        </div>
    )
}


export default LandingPage;
