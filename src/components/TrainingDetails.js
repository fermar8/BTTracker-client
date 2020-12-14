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
        
        const {id} = this.props.match.params
        
        axios.put(`http://localhost:4000/api/performance/${id}`, 
          {exercises: this.state.exercises, notes: this.state.notes})
        .then( () => {
          this.setState({exercises: "", notes: ""});
        })
        .catch( (err) => console.log(err) )
      }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
  
    render(){      

      console.log(this.props)

      return (
        <form className="form-inline" onSubmit={this.handleFormSubmit}>
          
        <label>Exercises:</label>
        <textarea type="text" 
          name="name" 
          value={this.state.name} 
          onChange={ (e) => this.handleChange(e) }
        />
        
        <label>Notes:</label>
        <input className="number" type="text" 
          name="number" 
          value={this.state.number} 
          onChange={ (e) => this.handleChange(e) } 
        />
        
        <button type="submit">Edit</button>
      </form>
        )
  }

}


export default withRouter(TrainingDetails);