import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { withAuth } from './../context/auth-context';
import axios from 'axios';
import { Link } from 'react-router-dom'
 
class CalendarPage extends Component {
    state = {
        date: new Date().toLocaleDateString(),
        trainings: []
    }

    onChange = date => {
        this.setState({
            date: date.toLocaleDateString()
        })
    }

    componentDidMount() {
      axios.get('http://localhost:4000/api/training')
        .then((response) => {
          this.setState({ trainings: response.data})
          console.log(this.state)
        })
    }



    addTraining = (event) =>{
      event.preventDefault();
      axios.post("http://localhost:4000/api/training")
      .then( (createdTraining) => {
        const trainingToState = this.trainings.push(createdTraining)
        this.setState({trainings: trainingToState});
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
              <p>You have a training scheduled for this date</p> 
              <Link to={`/training/${idToString}`}>
              <button>Edit training</button>
              </Link>   
             </div>
  } else {
    button = <div>
              <p>Schedule a training for this date</p>
              <button onClick={this.addTraining}>Add training</button>
             </div>
  }
     
  
  return (
    <div>
      <Calendar
        onChange={this.onChange}
      />
<>
      <p>{dateToString}</p>
        {button}
    </>


    </div>
  );
 }
}

export default withAuth(CalendarPage);


     