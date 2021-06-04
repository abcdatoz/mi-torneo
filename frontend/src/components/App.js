import React, {  Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Redirect} from 'react-router-dom'


import { Provider } from 'react-redux'
import store from '../store'

import Header from './layout/Header'    

import Login from './accounts/Login'   
import Register from './accounts/Register'   
import PrivateRoute from './common/PrivateRoute'  



import Home from './Home'
import Torneo from './Torneo'
import Equipo from './Equipo'
import Juego from './Juegos'


const App = () => {
    return (
        <Provider store={store}>            
            <Router> 
                <Fragment>

                    <Header /> 


                    <div className="contenido">
                        <Switch>
                            <Route exact path="/" component = {Home} />
                            <Route exact path="/register" component = {Register} />
                            <Route exact path="/login" component = {Login} />

                            <PrivateRoute exact path="/torneos" component = {Torneo} />
                            <PrivateRoute exact path="/equipos" component = {Equipo} />
                            <PrivateRoute exact path="/juegos" component = {Juego} />
                             
                            
                        </Switch>
                        
                    </div>
                </Fragment>
            </Router>
        </Provider>

    )
}


ReactDOM.render(<App />, document.getElementById('app'))