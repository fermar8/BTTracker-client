import React, { Component } from 'react';
import axios from 'axios';
import EditStats from './EditStats'
//import TrainingDetails from './TrainingDetails'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import {StyledButton} from './../styles/button'


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

    axios.get(`http://localhost:4000/api/training/${id}`, {withCredentials: true})
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
      axios.delete(`http://localhost:4000/api/training/${id}`, {withCredentials: true})
        .then( () => this.props.history.push('/calendar') )
        .catch( (err) => console.log(err))
  }

  handleChange = (event) => { 
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){

  console.log(this.state.trainingToEdit)

    return(
  
  <main className="main">
    
    <div>
     <table> 
      <thead>
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
          <th></th>
       </tr>
      </thead>
      <tbody>
    {this.state.stats.map((performance) => {
  return (
      <tr key={performance._id}>
        <Link to={`/team/${performance.player._id}`} id='stats-btn'>
          <td style={{fontWeight: "bold", color: "black"}}>{performance.player.name}</td>
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
          <td><button onClick={(e) => this.showStats (performance)}>Edit</button></td>
           
      </tr>
   

        )
   })}
        </tbody>
    </table>
       {this.state.isDisplayed ? 
                <EditStats getPerformances={this.getPerformances} performanceToEdit={this.state.performanceToEdit}/> : null}
            <StyledButton onClick={this.deleteTraining}>Delete Training</StyledButton>
    </div>
 </main>
    )
  }
}

export default withRouter(TrainingStats);