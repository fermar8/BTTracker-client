import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withAuth } from './../context/auth-context';
//import teamPageService from './../lib/team-page-service';


class TrainingPage extends Component {
    render() {
        return (
            <div>
                <p>Hola</p>
            </div>
        )
    }
}


export default withAuth(TrainingPage);