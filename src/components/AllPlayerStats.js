import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';



//Try to make a single button for every EditStats form

class AllPlayerStats extends Component {
  constructor(props){
      super(props);
        this.state = {
            data: [],
            matches: window.matchMedia("(min-width: 900px)").matches
        }
   }

componentDidMount() {
  const handler = e => this.setState({matches: e.matches});
  window.matchMedia('(min-width: 900px)').addListener(handler);
    axios.get(process.env.REACT_APP_API_URL + '/api/team/stats', {withCredentials: true})
        .then( (response ) => {
            this.setState({data: [...response.data]});
        })
        .catch((err) => console.log(err))
}

render() {

    let data = this.state.data
    

    const allPerformances = [...data];

    const playerPerformancesObj = {
    
    };

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
                playerId: playerId,
                attended: 1,
                notAttended: 0,
                ftAttempted: perfObj.ftAttempted,
                ftConverted: perfObj.ftConverted,
                twoPAttempted: perfObj.twoPAttempted,
                twoPConverted: perfObj.twoPConverted,
                threePAttempted: perfObj.threePAttempted,
                threePConverted: perfObj.threePConverted,
            }
        } else if (!recordExists && !perfObj.attendance) {
            playerPerformancesObj[playerName] = {
                name: playerName,
                playerId: playerId,
                attended: 0,
                notAttended: 1,
                ftAttempted: perfObj.ftAttempted,
                ftConverted: perfObj.ftConverted,
                twoPAttempted: perfObj.twoPAttempted,
                twoPConverted: perfObj.twoPConverted,
                threePAttempted: perfObj.threePAttempted,
                threePConverted: perfObj.threePConverted,
            }
        } else if (recordExists && perfObj.attendance){
            const existingPerformance = playerPerformancesObj[playerName];
            existingPerformance.attended++
            existingPerformance.ftAttempted += perfObj.ftAttempted;
            existingPerformance.ftConverted += perfObj.ftConverted;
            existingPerformance.twoPAttempted += perfObj.twoPAttempted;
            existingPerformance.twoPConverted += perfObj.twoPConverted;
            existingPerformance.threePAttempted += perfObj.threePAttempted;
            existingPerformance.threePConverted += perfObj.threePConverted;

        } else if (recordExists && !perfObj.attendance) {
            const existingPerformance = playerPerformancesObj[playerName];
            existingPerformance.notAttended++
            existingPerformance.ftAttempted += perfObj.ftAttempted;
            existingPerformance.ftConverted += perfObj.ftConverted;
            existingPerformance.twoPAttempted += perfObj.twoPAttempted;
            existingPerformance.twoPConverted += perfObj.twoPConverted;
            existingPerformance.threePAttempted += perfObj.threePAttempted;
            existingPerformance.threePConverted += perfObj.threePConverted;
            
        }
    })

    const playerPerformancesArr = Object.keys(playerPerformancesObj).map((key) => playerPerformancesObj[key] );

    return(
    <>
        {this.state.matches && (<main className="training-main">
        <h1 className="overall-perf-title">Overall Performance</h1>
{playerPerformancesArr.map((performance) => {
  return (
    <div className="border-table">
    <table className="stats-training">
      <thead>
        <tr>
          <th>Player</th>
          <th>Attended</th>
          <th>Attendance %</th>
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
       <tr key={performance.perfId}>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.name}</td>
          <td>{performance.attended}/{performance.notAttended + performance.attended}</td>
          <td>{(performance.attended/(performance.attended + performance.notAttended)*100).toPrecision(3)}</td>
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
 </main>)
  }

      {!this.state.matches && (<main className="training-main">
      <h1 className="overall-perf-title">Overall Performance</h1>
{playerPerformancesArr.map((performance) => {
  return (
    <div className="border-table">
     <table className="player-attendance"> 
      <thead>
      <tr>
          <th>Player</th>
          <th>Attended</th>
          <th>Attendance %</th>
       </tr>
      </thead>
      <tbody>
      <tr key={performance.perfId}>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.name}</td>
          <td>{performance.attended}/{performance.notAttended + performance.attended}</td>
          <td>{(performance.attended/(performance.attended + performance.notAttended)*100).toPrecision(3)}</td>
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
 </main>)
  }
</>
    )
  }
}


export default withRouter(AllPlayerStats);