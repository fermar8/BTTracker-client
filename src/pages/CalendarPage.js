import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { withAuth } from './../context/auth-context';
import axios from 'axios';
import { StyledButton } from './../styles/button';
import { Link } from 'react-router-dom';
import './../pages/Calendar.css';

 
class CalendarPage extends Component {
    state = {
        date: new Date().toLocaleDateString(),
        trainings: [],
    }

    onChange = date => {
        this.setState({
            date: date.toLocaleDateString()
        })
    }

    componentDidMount() {
      this.getTrainings()
    }

    getTrainings = () => {
      axios.get('http://localhost:4000/api/training', {withCredentials: true})
      .then((response) => {
        this.setState({ trainings: response.data})
        console.log(this.state)
      })
    }



    addTraining = (event) =>{
      event.preventDefault();
      axios.post("http://localhost:4000/api/training", {date: this.state.date}, {withCredentials: true})
      .then( (createdTraining) => {
        this.getTrainings()
      })
      .catch( (err) => console.log(err) )

    }
   


render() {
  const trainingDate = this.state.trainings.filter(training =>
  training.date === this.state.date).map(training => training.date)
  
  const dateToString = trainingDate.toString();

  const trainingId = this.state.trainings.filter(training => 
  training.date === this.state.date).map(training => training._id)
  
  const idToString = trainingId.toString();
  

  let button;
  if (dateToString.includes(this.state.date)) {
  
    button = <div>
              <p className="calendar-message">You have a training scheduled for this date</p> 
              <Link to={`/training/${idToString}`}>
              <StyledButton>Edit training</StyledButton>
              </Link>   
             </div>
  } else {
    button = <div>
              <p className="calendar-message">Schedule a training for this date</p>
              <StyledButton  onClick={this.addTraining}>Add training</StyledButton>
             </div>
  }
     
  
  return (
  <main className="main">
   <div className="main-div">
    <div>
      <Calendar className="calendar"
        onChange={this.onChange}
      />
<>
      <p>{dateToString}</p>
        {button}
    </>


    </div>
   </div>
  </main>
  );
 }
}

export default withAuth(CalendarPage);