import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Login extends Component{
    
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                login page
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;