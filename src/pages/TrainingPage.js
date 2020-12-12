import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withAuth } from './../context/auth-context';
import './../pages/TrainingPage.css'
import Stats from './../components/ShowEditStats'
//import teamPageService from './../lib/team-page-service';


class TrainingPage extends Component {

    state = {
        date: '',
        exercises: '',
        notes: '',
    }

    render() {
        return (
        <main className="main">
         <div>
            <Stats/>
            
            </div>
        </main>
        )
    }
}


export default withAuth(TrainingPage);