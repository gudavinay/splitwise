import React, { Component } from 'react';
// import { useParams } from 'react-router-dom';
import '../../splitwise.css';
class GroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // let {id} = useParams();
        console.log("props in groupinfo",this.props);
        const { id } = this.props.match.params;
        // console.log("url params in groupinfo - ", id);
        return (
            <div>
                you're in {id} 
            </div>
        );
    }
}

export default GroupInfo;