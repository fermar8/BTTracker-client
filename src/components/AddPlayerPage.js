import React, { Component } from 'react';
import axios from 'axios';
import './../components/Add-player.css'

class AddPlayer extends Component {
  constructor(props){
      super(props);
      this.state = { 
        name: "", 
        number: "", 
        email: "",
        };
  }
   

  handleFormSubmit = (event) => {
      event.preventDefault();
      const {name, number, email} = this.state;
      axios.post( process.env.REACT_APP_API_URL + "/api/players", { name, number, email }, {withCredentials: true})
      .then( () => {
        this.props.getPlayers()
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
      
     <div className="container-inline-form">
      <span onClick={this.props.showComponent} className="close-popup">&times;</span>
        <form onSubmit={this.handleFormSubmit}>

        <div className="edit-inline-form">
          <label className="team-form-label">Name:</label>
          <input className="team-name-input" type="text" 
            name="name" 
            value={this.state.name} 
            onChange={ (e) => this.handleChange(e) }
          />
        </div>
          
        <div className="edit-inline-form">
          <label className="team-form-label">Number:</label>
          <input className="team-number-input" type="number" 
            name="number" 
            value={this.state.number} 
            onChange={ (e) => this.handleChange(e) } 
          />
        </div>

        <div className="edit-inline-form">
          <label className="team-form-label">Email:</label>
          <input className="team-email-input" type="text"
            name="email" 
            value={this.state.email} 
            onChange={ (e) => this.handleChange(e) } 
          />
        </div>
          
        <div className="submit-player-btn">  
          <button className="submit-team" type="submit">Add a new player</button>
        </div>

        </form>
      </div>
    )
  }
}

export default AddPlayer;