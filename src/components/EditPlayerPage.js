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
      axios.put( process.env.REACT_APP_API_URL + `/api/players/${playerId}`, { name, number, email }, {withCredentials: true})
      .then( () => {
        this.props.getPlayers()
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
      
      <div className="container-inline-form">
       <span onClick={this.props.showComponent} className="close-popup">&times;</span>
        <form onSubmit={this.handleFormSubmit}>
          
        <div className="edit-inline-form">
          <label className="team-form-label">Name:</label>
          <input className="team-name-input" type="text" 
            name="name" 
            value={name} 
            onChange={ (e) => this.handleChange(e) }
          />
        </div>
          
        <div className="edit-inline-form">
          <label className="team-form-label">Number:</label>
          <input className="team-number-input" type="number" 
            name="number" 
            value={number} 
            onChange={ (e) => this.handleChange(e) } 
          />
        </div>

        <div className="edit-inline-form">
          <label className="team-form-label">Email:</label>
          <input className="team-email-input" type="text"
            name="email" 
            value={email} 
            onChange={ (e) => this.handleChange(e) } 
          />
        </div>
          
        <div className="submit-player-btn">
          <button className="submit-team" type="submit">Edit player</button>
        </div>
        </form>
      </div>
    )
  }
}

export default withRouter(EditPlayer);