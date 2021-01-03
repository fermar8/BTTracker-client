import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router'
import './../components/Add-player.css'

class DeletePlayer extends Component {
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
      const playerId = this.props.playerToDelete._id
      axios.delete( process.env.REACT_APP_API_URL + `/api/players/${playerId}`, {withCredentials: true})
      .then( () => {
        this.props.getPlayers()
        this.setState({name: "", number: "", email: ""});
      })
      .catch( (err) => console.log(err) )
    }
  

   componentDidMount() {
        const  {name, number, email} = this.props.playerToDelete;
  
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

      <p className= "delete-text">Are you sure you want to delete this player? All training and global stats will be lost.</p>

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
          <button className="submit-team" type="submit">Delete player</button>
        </div>
        </form>
      </div>
    
      
    )
  }
}

export default withRouter(DeletePlayer);