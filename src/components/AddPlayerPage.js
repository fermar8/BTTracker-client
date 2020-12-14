import React, { Component } from 'react';
import axios from 'axios';
import './../components/Add-player.css'

class AddPlayer extends Component {
  constructor(props){
      super(props);
      this.state = { name: "", number: "", email: "" };
  }
   
  handleFormSubmit = (event) => {
      event.preventDefault();
      const {name, number, email} = this.state;
      axios.post("http://localhost:4000/api/players", { name, number, email }, {withCredentials: true})
      .then( () => {
        // this.props.getData(); // leave this comment - we will used it later
        this.setState({name: "", number: "", email: ""});
      })
      .catch( (err) => console.log(err) )
    }
  

  handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div className="add-player-form">
        <form className="form-inline" onSubmit={this.handleFormSubmit}>
          
          <label>Name:</label>
          <input type="text" 
            name="name" 
            value={this.state.name} 
            onChange={ (e) => this.handleChange(e) }
          />
          
          <label>Number:</label>
          <input className="number" type="text" 
            name="number" 
            value={this.state.number} 
            onChange={ (e) => this.handleChange(e) } 
          />

          <label>Email:</label>
          <input type="text"
            name="email" 
            value={this.state.email} 
            onChange={ (e) => this.handleChange(e) } 
          />
          
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddPlayer;