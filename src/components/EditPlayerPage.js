import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router'
import './../components/Add-player.css'

class EditPlayer extends Component {
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
      const playerId = this.props.playerToEdit._id
      const {name, number, email} = this.state;
      axios.put(`http://localhost:4000/api/players/${playerId}`, { name, number, email }, {withCredentials: true})
      .then( () => {
        // this.props.getData(); // leave this comment - we will used it later
        this.setState({name: "", number: "", email: ""});
      })
      .catch( (err) => console.log(err) )
    }
  

   componentDidMount() {
        const  {name, number, email} = this.props.playerToEdit;
  
      this.setState({name, number, email});
      }

  handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){

    const {name, number, email} = this.state

    return(
      <div className="add-player-form">
        <form className="form-inline" onSubmit={this.handleFormSubmit}>
          
          <label>Name:</label>
          <input type="text" 
            name="name" 
            value={name} 
            onChange={ (e) => this.handleChange(e) }
          />
          
          <label>Number:</label>
          <input className="number" type="text" 
            name="number" 
            value={number} 
            onChange={ (e) => this.handleChange(e) } 
          />

          <label>Email:</label>
          <input type="text"
            name="email" 
            value={email} 
            onChange={ (e) => this.handleChange(e) } 
          />
          
          <button type="submit">Edit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(EditPlayer);