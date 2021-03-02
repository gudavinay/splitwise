import React, {Component} from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    
    render(){
        //if not logged in go to login page
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        return(
            <div>
                {/* {redirectVar} */}
                welcome to home
            </div> 
        )
    }
}
//export Home Component
export default Home;