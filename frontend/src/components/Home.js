import React, { useState,useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'
//import {getBanners} from '../actions/BannerActions'
//import {getCursos} from '../actions/CursoActions'
//import {getMisCursos} from '../actions/MisCursosActions' 
import {Link} from 'react-router-dom'


const Home = () => {

    const dispatch = useDispatch()

    const {isAuthenticated, user} = useSelector( store => store.auth);
/*
    const banners = useSelector(state => state.banner.lista)
    const cursos = useSelector(state => state.curso.lista)
    const miscursos = useSelector( state => state.miscursos.lista)
 
    const [cursosPendientes, setCursosPendientes] = useState([])
    const [cursosTomados, setCursosTomados] = useState([])
     
    useEffect(() => {
        dispatch(getCursos())
        dispatch(getBanners())
        dispatch(getMisCursos())
         
    }, [])


 */

   
  
     
    
    const guestOption = (
        <>
            <div className="subheader">
            <h2><span>guests</span></h2>
            </div>

                 
      
        </>
    )  










    const userOption = (
        <>

            <div className="subheader">
                <h2><span> user options</span></h2>
            </div>


                      
         </>
    )

    return(
 
        < >

        

        {
            isAuthenticated && !user.is_staff
            ? userOption
            : guestOption
        } 


 
        </>
    )
}


export default Home;
