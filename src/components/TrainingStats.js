import React, { Component } from 'react';
import axios from 'axios';
import EditStats from './EditStats'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import {StyledButton} from './../styles/button'
import TrainingDetails from './TrainingDetails'


//Try to make a single button for every EditStats form

class TrainingStats extends Component {
  constructor(props){
      super(props);
      this.state = { 
          isDisplayed: false,
          showEdit: false,
          showDetails: true,
          performanceToEdit: {},
          trainingToEdit: {},
          stats: [],
          date: "",
      }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`http://localhost:4000/api/training/${id}`, {withCredentials: true})
        .then( (response ) => {
            const stats = response.data.stats
            const training = response.data;
            const {date} = training;
            this.setState({date, 
              stats: [...stats], 
              trainingToEdit: response.data});
        })
        .catch((err) => console.log(err))
}
  
  showStats = (performance) => {
      this.setState({
          isDisplayed: !this.state.isDisplayed,
          performanceToEdit: performance
      });
  }

  showEdit = (e) => {
    this.setState({
      showEdit: !this.state.showEdit
    })
    this.setState({showDetails: !this.state.showDetails})
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


    return(
  
  <div>

<h2>{this.state.date}</h2>

{this.state.showDetails  ?
                <div className="details">
                    <h3>Exercises: </h3>
                    <p>{this.state.trainingToEdit.exercises}</p>

                    <h3>Notes: </h3>
                    <p>{this.state.trainingToEdit.notes}</p>

                    <button onClick={(e) => this.showEdit (e)}>Edit Training</button>
               </div> : null }


{this.state.showEdit ?
      <TrainingDetails trainingToEdit={this.state.trainingToEdit} /> : null }   
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
          <td style={{fontWeight: "bold", color: "black"}}>{performance.player.name}</td>
       
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
                <EditStats performanceToEdit={this.state.performanceToEdit}/> : null}
            <StyledButton onClick={this.deleteTraining}>Delete Training</StyledButton>
    </div>
 </main>
</div>
    )
  }
}

//<Link to={`/team/${performance.player._id}`} id='stats-btn'> </Link>

export default withRouter(TrainingStats);