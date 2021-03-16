import React, { Component } from 'react';

import { Carousel } from 'react-bootstrap';
import '../../App.css';
import Navbar from './Navbar';
import homeBanner1 from '../../images/homeBanner1.png';
import homeBanner2 from '../../images/homeBanner2.png';
import homeBanner3 from '../../images/homeBanner3.png';
import homeBanner4 from '../../images/homeBanner4.png';
import { Redirect } from 'react-router';
import { getUserProfile } from '../Services/ControllerUtils';


class LandingPage extends Component {
    render() {
        let redirectVar = null;
        if (getUserProfile()) {
            redirectVar = <Redirect to="/home/s/dashboard" />
        }
        return (
            <React.Fragment>
                {redirectVar}
                <Navbar />
                <Carousel interval={1500}>
                    <Carousel.Item>
                        <img src={homeBanner1} alt="Banner 1" style={{ height: '100%', width: '100%' }}></img>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={homeBanner2} alt="Banner 2" style={{ height: '100%', width: '100%' }}></img>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={homeBanner3} alt="Banner 3" style={{ height: '100%', width: '100%' }}></img>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={homeBanner4} alt="Banner 4" style={{ height: '100%', width: '100%' }}></img>
                    </Carousel.Item>
                </Carousel>
            </React.Fragment>
        )
    }
}

export default LandingPage;