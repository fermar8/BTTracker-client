import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import TrainingStats from './../components/TrainingStats'
import './../components/EditStats.css'



class TrainingDetails extends Component {
    constructor(props){
        super(props);
        this.state = { 
          exercises: "",
          notes: ""
         };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        
        const trainingId = this.props.trainingToEdit._id
        
        axios.put(`http://localhost:4000/api/training/${trainingId}`, 
          {exercises: this.state.exercises, notes: this.state.notes})
        .then( () => {
          this.setState({exercises: "", notes: ""});
        })
        .catch( (err) => console.log(err) )
      }

      componentDidMount() {
        const  {exercises, notes} = this.props.trainingToEdit;
  
      this.setState({exercises, notes});
      }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
  
    render(){      
     
      console.log(this.props.trainingToEdit)
      const {exercises, notes} = this.state

      return (
        <form className="form-inline" onSubmit={this.handleFormSubmit}>
          
        <label>Exercises:</label>
        <textarea type="text" 
          name="exercises" 
          value={exercises} 
          onChange={ (e) => this.handleChange(e) }
        />
        
        <label>Notes:</label>
        <input className="number" type="text" 
          name="notes" 
          value={notes} 
          onChange={ (e) => this.handleChange(e) } 
        />
        
        <button type="submit">Edit</button>
      </form>
        )
  }

}


export default withRouter(TrainingDetails);