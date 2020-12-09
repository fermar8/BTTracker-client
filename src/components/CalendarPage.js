import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
 
class CalendarPage extends Component {
    state = {
        date: new Date()
    }

    onChange = date => {
        this.setState({
            date
        })
    }

    addTraining = () =>{}
    editTraining = () =>{}   //handle button functions -- Ternary add - edit/delete
    deleteTraining = () =>{}


render() {
  return (
    <div>
      <Calendar
        onChange={this.onChange}


      />
      <button onClick={this.addTraining}>Add training</button>
      <button onClick={this.editTraining}>Edit training</button>   
      <button onClick={this.deleteTraining}>Delete training</button>

    </div>
  );
 }
}

export default CalendarPage;


     