import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import LandingPage from './LandingPage/LandingPage';
import SignUp from './SignUp/SignUp';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={LandingPage}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/home" component={Home}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;