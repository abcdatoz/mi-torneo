import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { login }  from '../../actions/auth'



export class Login extends Component {
    state = {
        username:'',        
        password:''
    }

    

    onSubmit = e => {
        e.preventDefault();

        const {username, password} = this.state;

        if(username == '' ||  password == ''){
            alert ('El usuario y contraseña son necesarios para loguearse');
            return;
        }

        this.props.login(username, password)
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }
    render() {
        if(this.props.isAuthenticated){
            return<Redirect to ="/" />;
        }

        const { username,password} = this.state;
         
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h3 className="text-center">Mi Torneo :: Entrar</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />                            
                        </div>
 

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />                            
                        </div>


                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Entrar
                            </button>
                        </div>
                        <p>
                        <br/>
                        <br/>

                            ¿Aún no tienes cuenta? <br/>
                            <Link to="/register">Registrate</Link> y diviertete aprendiendo
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapSate = state => ({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapSate,{login})(Login);
 



 