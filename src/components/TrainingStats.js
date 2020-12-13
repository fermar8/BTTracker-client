import React, { Component } from 'react';
import axios from 'axios';
import EditStats from './EditStats'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'


//Try to make a single button for every EditStats form

class TrainingStats extends Component {
  constructor(props){
      super(props);
      this.state = { 
          isDisplayed: false,
          stats: []
      }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/api/training/${id}`)
        .then( (response ) => {
            const stats = response.data.stats
            const training = response.data;
            const {date, exercises, notes} = training;
            this.setState({date, exercises, notes, stats: [...stats]});
        })
        .catch((err) => console.log(err))
}
  
  showStats = () => {
      this.setState({
          isDisplayed: !this.state.isDisplayed,
      });
  }
 
  deleteTraining = () => {
      const { id } = this.props.match.params
      axios.delete(`http://localhost:4000/api/training/${id}`)
        .then( () => this.props.history.push('/calendar') )
        .catch( (err) => console.log(err))
  }

  handleChange = (event) => { 
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
     <main className="main">
        <div>
        {this.state.stats.map((performance) => {
  return (
    <div>
    <table key={performance._id}> 
     <tbody>
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
        <Link to={`/team/${performance.player._id}`} id='stats-btn'>
          <td>{performance.player.name}</td>
        </Link>
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
      </tbody>
    </table>
    
            {this.state.isDisplayed ? 
                <EditStats/> : null}
       </div>  
        )
   })}
            <button onClick={this.deleteTraining}>Delete Training</button>
    </div>
 </main>
    )
  }
}

export default withRouter(TrainingStats);