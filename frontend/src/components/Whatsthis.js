import React, {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getEstados} from '../actions/EstadoActions'
import {getTorneos} from '../actions/TorneoActions'


const Whatsthis = () => {


    //use selectors
    const estados = useSelector(state => state.estados.lista)
    const torneos = useSelector(state => state.torneos.lista)
    
    //use dispatch
    const dispatch = useDispatch()

        
    //useEffect
    useEffect( () => {
        dispatch(getEstados())
        dispatch(getTorneos())
        
    },[])

    return (
        <>
           
           
            <section className="header-sec" id="home" >
                    <div className="overlay">
                        <div className="container">
                            <div className="row text-center" >
                
                                <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                    
                                    <h2 data-scroll-reveal="enter from the bottom after 0.1s">
                                        <strong>Mi Torneo</strong>
                                    </h2>
                                                    
                                    <p data-scroll-reveal="enter from the bottom after 0.8s">
                                        <h4>  
                                                Es una plataforma web pensada para los(as) jugadores(as) y los(as) capitanes(as) de equipos de Futbol 
                                                <br />
                                                <br />
                                                y una excelente herramienta de apoyo para los(as) administradores de torneos.                          
                                            </h4>                               
                                            
                                    </p>
                    
                                </div>
                        
                            </div>
                        </div>
                    </div>
                
                </section>
       

                <section className="features" id="features">
                    <div className="container">

                        <div className="row text-center" >           
                            <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                                <br/>               
                                <h3 data-scroll-reveal="enter from the bottom after 0.1s">
                                    <strong>Características de Mi-Torneo</strong>
                                </h3>                
                            </div>                  
                        </div>

                        <div className="row " >           
                            <div className="col-lg-6 col-md-6 col-sm-6" data-scroll-reveal="enter from the left after 0.4s" >
                                <div className="media">

                                    <div className="pull-left">
                                        <i className=" fa fa-chart-bar fa-5x "></i>
                                    </div>

                                    <div className="media-body">
                                        <h4 className="media-heading"><strong> Tablas de Posiciones </strong></h4>
                                        <p>
                                            La tabla general de posiciones  y la tabla por grupos se actualizan semanalmente, en cuanto los resultados 
                                            de las jornadas se van desarrollando.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-md-6 col-sm-6" data-scroll-reveal="enter from the right after 0.7s">
                                <div className="media">
                                    <div className="pull-left">
                                        <i className=" fa fa-futbol fa-5x "></i>
                                    </div>

                                    <div className="media-body">
                                        <h4 className="media-heading"><strong> El Goleo </strong></h4>
                                        <p>
                                            La tabla de Goleo es otra de las tablas que siempre estará actualizado, y jornada tras jornada se va actualizando.
                                        </p>
                                    </div>

                                </div>
                            </div>  
              
                        </div>

                        <p><br /></p>

                        <div className="row text-center just-pad" >
                
                            <div className="col-lg-4 col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.2s" >
                                <i className=" fa fa-database fa-5x "></i>
                                <h4 ><strong> Historico de Juegos </strong></h4>
                                
                                <p>
                                    En Mi-Torneo se podrá siempre consultar los resultados de todos los juegos de todas las jornadas. 
                                    y en cada juego se podrá consultar los registros de los goles, tarjetas amarillas y rojas ocurridas durante los encuentros.
                                </p>
                            </div>
                    
                            <div className="col-lg-4 col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.8s" >
                                <i className=" fa fa-photo-video fa-5x "></i>
                                <h4 ><strong> Multimedia </strong></h4>
                                
                                <p>
                                    La aplicación le permitira al administrador, cargar fotos de los equipos, jugadores, escudo del equipo 
                                    y ligas de videos de youtube u otras redes sociales para personalizar la visita a cada torneo.
                                </p>
                            </div>
                            
                            <div className="col-lg-4 col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 1.4s" >
                                <i className=" fa fa-cogs fa-5x "></i>
                                <h4 ><strong> Generación automatizada de roles </strong></h4>
                                
                                <p>
                                    Generación automática de nuevos roles de juego, a la orden de un simple click, 
                                    lo que  ayudará al administrador a la elaboración de roles sin el problema de repetir encuentros.
                                </p>
                            </div>
                        </div>

                
                    </div>
           
                </section>
    

                <section className="sayings" id="sayings" >
                    <div className="overlay">
                        <div className="container">
                            <div className="row text-center" >
                
                                <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                    
                                  
                              

                                    <h4 data-scroll-reveal="enter from the bottom after 0.8s">
                                        <i class="fa fa-quote-left "></i> 
                                            Juego para ser feliz y la gente que valore lo que tenga que valorar. 
                                            Si valoran mi trabajo, encantado, si no, no pasa nada
                                        <i class="fa fa-quote-right "></i>
                                        
                                        
                                    </h4>
                                    <span class="pull-right"><strong>-Andrés Iniesta</strong></span>




                                         

                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>        
                </section>
       

                <section className="openTournaments" id="openTournaments" >
                    <div className="container">
                        <div className="row text-center" >
           
                            <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
               
                                <h3 data-scroll-reveal="enter from the bottom after 0.1s">
                                    <strong> Torneos Abiertos Actualmente</strong>
                                </h3>                                         
                            </div>
                
                        </div>
     
                        <div className="row " >
           



                        {
                            torneos
                                .map( torneo => (


                                    <div  key={torneo.id} className="col-lg-4 col-md-4 col-sm-4" data-scroll-reveal="enter from the left after 0.2s" >
                        
                                    <img  src={torneo.imagen} width="200" height="120"/><br/>
                                        <strong> {torneo.nombre}  </strong><br/>
                                        <i>{torneo.localidad} | { estados.filter(x=>x.id == torneo.estado)[0].nombre }</i>
                                       
                                    </div>

                                                 

                            ))
                        }



                           
                        </div>
                    </div>
           
                </section>

                



                <section className="signin-sec" id="signIn" >
                    <div className="overlay">
                        <div className="container">
                            <div className="row text-center" >
                
                                <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">


                                    <h3 data-scroll-reveal="enter from the bottom after 0.1s">
                                        <strong>¿Aún no tienes cuenta? </strong>
                                    </h3>
                                        
                                    <h4 data-scroll-reveal="enter from the bottom after 0.8s">                                
                                        Registrate y comienza a administrar tu torneo y descubre lo fácil que es registrar :
                                    </h4>
                                    <ul>
                                        <li> El torneo y los grupos </li>
                                        <li> Los equipos y sus jugadores </li>
                                        <li> Las Jornadas y sus juegos </li>
                                        <li> Los goles </li>                                    
                                    </ul> 

                                    <a className="btn btn-outline-success btnEntrar"  href="/#/login">Entrar</a>

                     
                    
                                </div>
                        
                            </div>
                        </div>
                    </div>
                
                </section>







                <section className="contact" id="contact" >
                    <div className="container">
                        
                        <div className="row text-center " >
                
                            <div className="col-lg-12 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                    
                                <h3 data-scroll-reveal="enter from the bottom after 0.1s">
                                <strong>Contactanos</strong>
                                </h3>                
                            </div>                
                        </div>
                
                        <div className="row">
                            
                            <div className="col-lg-6 col-md-6 col-sm-6" data-scroll-reveal="enter from the left after 0.4s">                            
                                <p> Tienes alguna duda, contactanos.</p>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6" data-scroll-reveal="enter from the right after 0.2s">                            
                                <p>email: abcdatoz.code@gmail.com</p>
                            </div>
                            
                        </div>
                    </div>
                </section>
     
            <div className="myfooter" >
                &copy; 2021 abcdatoz . CODE 
            </div>



        </>         
    )
}

export default Whatsthis