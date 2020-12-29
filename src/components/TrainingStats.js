import React, { Component } from 'react';
import axios from 'axios';
import EditStats from './EditStats'
import './../pages/TrainingPage.css'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'



//Try to make a single button for every EditStats form

class TrainingStats extends Component {
  constructor(props){
      super(props);
      this.state = { 
          isDisplayed: false,
          performanceToEdit: {},
          stats: []
      }
  }

  componentDidMount() {
    this.getPerformances()
    
}
  
  getPerformances = () => {
    const { id } = this.props.match.params;

    axios.get(process.env.REACT_APP_API_URL + `/api/training/${id}`, {withCredentials: true})
        .then( (response ) => {
            const stats = response.data.stats
            const training = response.data;
            this.setState({ stats: [...stats], isDisplayed: false});
        })
        .catch((err) => console.log(err))
  }

  showStats = (performance) => {
      this.setState({
          isDisplayed: !this.state.isDisplayed,
          performanceToEdit: performance
      });
  }
 
  deleteTraining = () => {
      const { id } = this.props.match.params
      axios.delete(process.env.REACT_APP_API_URL + `/api/training/${id}`, {withCredentials: true})
        .then( () => this.props.history.push('/calendar') )
        .catch( (err) => console.log(err))
  }

  handleChange = (event) => { 
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){

  let playerPerformancesObj = {};

  const allPerformances = this.state.stats

  allPerformances.forEach((perfObj) => {

    if (!perfObj.player) return;
    const playerName = perfObj.player.name;
    const playerId = perfObj.player._id;
    const recordExists = playerPerformancesObj[playerName] !== undefined;
    //                   playerPerformancesObj.Ferran
    
    if (!recordExists && perfObj.attendance){
    //  playerPerformancesObj.Ferran
        playerPerformancesObj[playerName] = {
            name: playerName,
            attendance: true,
            attended: "Yes",
            date: perfObj.date,
            perfId: perfObj._id,
            ftAttempted: perfObj.ftAttempted,
            ftConverted: perfObj.ftConverted,
            twoPAttempted: perfObj.twoPAttempted,
            twoPConverted: perfObj.twoPConverted,
            threePAttempted: perfObj.threePAttempted,
            threePConverted: perfObj.threePConverted,
        }
    }
    else if (!recordExists && !perfObj.attendance){
        playerPerformancesObj[playerName] = {
            name: playerName,
            attendance: false,
            perfId: perfObj._id,
            date: perfObj.date,
            attended: "No",
            ftAttempted: perfObj.ftAttempted,
            ftConverted: perfObj.ftConverted,
            twoPAttempted: perfObj.twoPAttempted,
            twoPConverted: perfObj.twoPConverted,
            threePAttempted: perfObj.threePAttempted,
            threePConverted: perfObj.threePConverted,
        }
    }

})

const playerPerformancesArr = Object.keys(playerPerformancesObj).map((key) => playerPerformancesObj[key] )
  
  console.log('playerPerformancesArr', playerPerformancesArr)

    return(
  
  <main className="main">
    
    <div>
     <table> 
      <thead>
      <tr>
          <th>Player</th>
          <th>Attendance</th>
          <th>FT</th>
          <th>FTA</th>
          <th>FT%</th>
          <th>2P</th>
          <th>2PA</th>
          <th>2P%</th>
          <th>3P</th>
          <th>3PA</th>
          <th>3P%</th>
          <th></th>
       </tr>
      </thead>
      <tbody>
    {playerPerformancesArr.map((performance) => {
  return (
      <tr key={performance.perfId}>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.name}</td>

          <td>{performance.attended}</td>
          <td>{performance.ftConverted}</td>
          <td>{performance.ftAttempted}</td>
          <td>{(((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3) + '%' === undefined||NaN) ? 0 : ((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3) + '%'}</td>
          <td>{performance.twoPConverted}</td>
          <td>{performance.twoPAttempted}</td>
          <td>{((performance.twoPConverted/performance.twoPAttempted)*100).toPrecision(3) + '%'}</td>
          <td>{performance.threePConverted}</td>
          <td>{performance.threePAttempted}</td>
          <td>{((performance.threePConverted/performance.threePAttempted)*100).toPrecision(3) + '%'}</td>
          <td><button className="training-button" onClick={(e) => this.showStats (performance)}>Edit</button></td>
           
      </tr>
   

        )
   })}
        </tbody>
    </table>
       {this.state.isDisplayed ? 
                <EditStats getPerformances={this.getPerformances} performanceToEdit={this.state.performanceToEdit}/> : null}
            <button className="delete-training" onClick={this.deleteTraining}>Delete Training</button>
    </div>
 </main>
    )
  }
}

export default withRouter(TrainingStats);