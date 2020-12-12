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
            <h1>Training on: {this.state.date}</h1>
            <p>Exercises for today: {this.state.exercises}</p>
            <p>Notes: {this.state.notes}</p>
            <div>
                {this.state.stats.map((performance) => {
          return (
            <table key={performance._id}> 
              <tr>
                  <th>Player</th>
                  <th>Feedback</th>
                  <th>FT</th>
                  <th>FTA</th>
                  <th>FT%</th>
                  <th>2P</th>
                  <th>2PA</th>
                  <th>2P%</th>
                  <th>3P</th>
                  <th>3PA</th>
                  <th>3P%</th>
              </tr>
              <tr>
                  <td>{performance.player.name}</td>
                  <td>{performance.coachComments}</td>
                  <td>{performance.ftConverted}</td>
                  <td>{performance.ftAttempted}</td>
                  <td>{((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3) + '%'}</td>
                  <td>{performance.twoPConverted}</td>
                  <td>{performance.twoPAttempted}</td>
                  <td>{((performance.twoPConverted/performance.twoPAttempted)*100).toPrecision(3) + '%'}</td>
                  <td>{performance.threePConverted}</td>
                  <td>{performance.threePAttempted}</td>
                  <td>{((performance.threePConverted/performance.threePAttempted)*100).toPrecision(3) + '%'}</td>
                  <td><button onClick={this.showStats}>Edit</button></td>
              </tr>
            </table>
          )
        } )}
            </div>
         </div>
        </main>
        )
    }
}


export default withAuth(TrainingPage);