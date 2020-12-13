import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import './../pages/TrainingPage.css'
import TrainingStats from '../components/TrainingStats'
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
            <TrainingStats/>
            
            </div>
        </main>
        )
    }
}


export default withAuth(TrainingPage);