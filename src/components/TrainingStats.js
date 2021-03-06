import React, { Component } from 'react';
import axios from 'axios';
import EditStats from './EditStats'
import DeleteTraining from './DeleteTraining'
import './../pages/StatsAndTraining.css'
import { withRouter } from 'react-router'

class TrainingStats extends Component {
  constructor(props){
      super(props);
      this.state = { 
          isDisplayed: false,
          performanceToEdit: {},
          showDelete: false,
          stats: [],
          training: {},
          matches: window.matchMedia("(min-width: 900px)").matches
      }
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia('(min-width: 900px)').addListener(handler);
    this.getPerformances() 
}
  
  getPerformances = () => {
    const { id } = this.props.match.params;

    axios.get(process.env.REACT_APP_API_URL + `/api/training/${id}`, {withCredentials: true})
        .then( (response ) => {
          console.log(response.data)
            const stats = response.data.stats
            const trainingToEdit = response.data;
            this.setState({ stats: [...stats], isDisplayed: false, training: trainingToEdit});
        })
        .catch((err) => console.log(err))
  }

  showStats = (performance) => {
      this.setState({
          isDisplayed: !this.state.isDisplayed,
          performanceToEdit: performance
      });
  }
 
  handleChange = (event) => { 
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  showDeleteTraining = () => {
    this.setState({showDelete: !this.state.showDelete})
  }

  showComponent = () => {
    if (this.state.isDisplayed || this.state.showDelete) {
      this.setState({
        isDisplayed: false,
        showDelete: false
      })
    }
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

const playerPerformancesArr = Object.keys(playerPerformancesObj).map((key) => playerPerformancesObj[key] );

    return(

      <>
      {this.state.isDisplayed ? 
                <EditStats showComponent={this.showComponent} getPerformances={this.getPerformances} performanceToEdit={this.state.performanceToEdit}/> : null}
       {this.state.showDelete ?         
                <DeleteTraining showComponent={this.showComponent} history={this.props.history} training={this.state.training}/> : null }
                
     


      {this.state.matches && (<main className="training-main">
      {this.state.stats.slice(0,1).map((trainingDay) => {
        return <h1 className="single-training-date">{trainingDay.date}</h1>
      })}
{playerPerformancesArr.map((performance) => {
  return (
    <div className="border-table">
    <table className="stats-training">
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
       <tr key={performance.perfId}>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.name}</td>
          <td>{performance.attended}</td>
          <td>{performance.ftConverted}</td>
          <td>{performance.ftAttempted}</td>
          {((performance.ftConverted/performance.ftAttempted)*100) ?
          <td>{((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3)}</td> : <td>0</td>}
          <td>{performance.twoPConverted}</td>
          <td>{performance.twoPAttempted}</td>
          {((performance.twoPConverted/performance.twoPAttempted)*100) ?
          <td>{((performance.twoPConverted/performance.twoPAttempted)*100).toPrecision(3)}</td> : <td>0</td>}
          <td>{performance.threePConverted}</td>
          <td>{performance.threePAttempted}</td>
          {((performance.threePConverted/performance.threePAttempted)*100) ?
          <td>{((performance.threePConverted/performance.threePAttempted)*100).toPrecision(3)}</td> : <td>0</td> }
          <td><button className="edit-training-button" onClick={(e) => this.showStats (performance)}>Edit</button></td>
        </tr>
        </tbody>  
    </table>
    </div>
    )
   })}

   <button className="delete-training-button" onClick={this.showDeleteTraining}>Delete Training</button>
 </main>)
  }

      {!this.state.matches && (<main className="training-main">
      {this.state.stats.slice(0,1).map((trainingDay) => {
        return <h1 className="single-training-date">{trainingDay.date}</h1>
      })}
{playerPerformancesArr.map((performance) => {
  return (
    <div className="border-table">
     <table className="player-attendance"> 
      <thead>
      <tr>
          <th>Player</th>
          <th>Attendance</th>
          <th></th>
       </tr>
      </thead>
      <tbody>
      <tr key={performance.perfId}>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.name}</td>
          <td>{performance.attended}</td>
          <td><button className="edit-training-button" onClick={(e) => this.showStats (performance)}>Edit</button></td> 
      </tr>
        </tbody>
    </table>
    <table className="stats-training">
      <thead>
        <tr>
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
      </thead>
        <tbody>
       <tr>
        <td>{performance.ftConverted}</td>
          <td>{performance.ftAttempted}</td>
          {((performance.ftConverted/performance.ftAttempted)*100) ?
          <td>{((performance.ftConverted/performance.ftAttempted)*100).toPrecision(3)}</td> : <td>0</td>}
          <td>{performance.twoPConverted}</td>
          <td>{performance.twoPAttempted}</td>
          {((performance.twoPConverted/performance.twoPAttempted)*100) ?
          <td>{((performance.twoPConverted/performance.twoPAttempted)*100).toPrecision(3)}</td> : <td>0</td>}
          <td>{performance.threePConverted}</td>
          <td>{performance.threePAttempted}</td>
          {((performance.threePConverted/performance.threePAttempted)*100) ?
          <td>{((performance.threePConverted/performance.threePAttempted)*100).toPrecision(3)}</td> : <td>0</td> }
        </tr>
        </tbody>  
    </table>
    </div>
    )
   })}

   <button className="delete-training-button" onClick={this.showDeleteTraining}>Delete Training</button>
 </main>)
  }
  
 </>
    )
  }
}


export default withRouter(TrainingStats);