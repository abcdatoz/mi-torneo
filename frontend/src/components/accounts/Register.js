import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { register }  from '../../actions/auth'
 


export class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        password2:'',
    }



    onSubmit = e => {
        e.preventDefault();
        const {username, email,password, password2} = this.state;


        
        if(username == '' ||  password == ''){
            alert ('Los campos de usuario y contraseña son necesarios para registrarse');
            return;
        }


        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        
        if (!emailRegex.test(email)) {
            alert('El email no fue capturado correctamente')     
            return;
        }

        if(password !== password2){
            alert('Los passwords no coinciden')
        }else{
             const newUser = {username, password, email};
             this.props.register(newUser);              
        }
    }

    componentDidMount(){
        
    }
 
    

    onChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }
    render() {

        if(this.props.isAuthenticated){
            return <Redirect to="/" />; 
        }
        const { username, email, password, password2} = this.state;

        
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center"> Nuevo Usuario </h2>
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
                            <label>E-mail</label>
                            <input 
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
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
                            <label>Conforme la Contraseña</label>
                            <input 
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />                            
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Registrar
                            </button>
                        </div>
                        <p>
                            ¿Ya tienes una cuenta?<Link to="/login">Entrar</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapSate = state => ({
    isAuthenticated:state.auth.isAuthenticated,    
});

export default connect(mapSate,{register})(Register);


 
 