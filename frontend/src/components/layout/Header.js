import React  from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'


const Header = () => {

    const {isAuthenticated, user} = useSelector( store => store.auth);
    const dispatch = useDispatch();
    

  
    const AdminLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

            <li className="nav-item">
                <a className="dropdown-item" href="/#/">You Must see all </a>
            </li>
            
 
             <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span><strong>{user ? `Usuario:  ${user.username}` : ""}</strong></span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={() => dispatch (logout()) }>Salir</a>                    
                
                </div>
            </li>                  
        </ul>                        
    );

    const userLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

            
            <li className="nav-item">
                <a className="dropdown-item" href="/#/torneos">Torneos</a>
            </li>
            <li className="nav-item">
                <a className="dropdown-item" href="/#/equipos">Equipos</a>
            </li>
            <li className="nav-item">
                <a className="dropdown-item" href="/#/juegos">Juegos</a>
            </li>

            <li className="nav-item">
                <a className="dropdown-item" href="/#/rol">Nuevo Rol</a>
            </li>     
            
 
 
             <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span><strong>{user ? `Usuario:  ${user.username}` : ""}</strong></span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={() => dispatch (logout()) }>Salir</a>                    
                
                </div>
            </li>                  
        </ul>                        
    );
 



    
    const guestLinks = (        
        <ul className="navbar-nav ml-auto mt-6 mt-lg-0">

            <li className="nav-item">
                <a className="dropdown-item" href="/#/whatsthis">¿Que es esto?</a>
            </li>     
            
        </ul>                        
    );


    return (            
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="#">Mi Torneo</a>                        
            </div>
            {isAuthenticated 
                ? user.is_staff
                    ? AdminLinks 
                    : userLinks
                : guestLinks
            }
        </nav>
        
    
    )
    
     
}
 
 export default Header;
