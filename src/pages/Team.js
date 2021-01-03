import React, { Component } from "react";
import axios from 'axios';
import { withAuth } from './../context/auth-context';
import AddPlayer from './../components/AddPlayerPage';
import EditPlayer from './../components/EditPlayerPage';
import DeletePlayer from './../components/DeletePlayer';

import {HomeBackground} from "./../styles/homeBackground"
import './../pages/Team.css'
//import teamPageService from './../lib/team-page-service';

class Team extends Component {
  state = {
    players: [],
    displayEdit: false,
    displayAdd: false,
    displayDelete: false,
    playerToEdit: {},
    playerToDelete: {},
    team: "",
    matches: window.matchMedia("(min-width: 550px)").matches
  };
  

  getPlayers = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/team', {withCredentials: true})
    .then((response) => {
      console.log(response)
      this.setState({ players: response.data.players,
        team: response.data.team, 
        displayEdit: false, 
        displayAdd: false, 
        displayDelete: false})
    })
  }

  componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 550px)").addListener(handler);
    this.getPlayers()
  }

 
  showAdd = () => {
    this.setState({
      displayAdd: !this.state.displayAdd,
      displayEdit: false,
      displayDelete: false
    })
  }


  showEdit(player) {
    this.setState({
      displayEdit: !this.state.displayEdit,
      playerToEdit: player,
      displayAdd: false,
      displayDelete: false})
  }

  showDelete(player) {
    this.setState({
      displayDelete: !this.state.displayDelete,
      playerToDelete: player,
      displayAdd: false,
      displayEdit: false})
  }

  showComponent = () => {
   if (this.state.displayDelete || this.state.displayEdit || this.state.displayAdd) {
   this.setState({
     displayDelete: false,
     displayAdd: false,
     displayEdit: false,
   })
  }
}

  render() {
    return (
 
   
    <HomeBackground> 

      {this.state.displayAdd ?
        <AddPlayer showComponent={this.showComponent} getPlayers={this.getPlayers}/> : null}
      {this.state.displayEdit ?
        <EditPlayer showComponent={this.showComponent} getPlayers={this.getPlayers} playerToEdit={this.state.playerToEdit}/> : null}
      {this.state.displayDelete ? 
        <DeletePlayer showComponent={this.showComponent} getPlayers={this.getPlayers} playerToDelete={this.state.playerToDelete}/> : null} 

   
    <div onClick={this.showComponent} className="team-list">
    <h1>Squad</h1>
    
    <div>
        {this.state.matches && (<table className="team-table"> 
     <thead>
     <tr>
         <th>Player</th>
         <th>Number</th>
         <th>Email</th>
         <th></th>
         <th></th>
      </tr>
     </thead>
     <tbody>

       {this.state.players.map((player) => {
         return (

     <tr key={player._id}>
         <td className="name-text">{player.name}</td>
         <td className="number-text">{player.number}</td>
         <td className="number-text">{player.email}</td>
         <td><button className="team-edit" onClick={(e) => this.showEdit (player)}>Edit</button></td>
         <td><button className="team-delete" onClick={(e) => this.showDelete (player)}>Delete</button></td>  
     </tr>
       )
  })}
       </tbody>
   </table>)}

   {!this.state.matches && (<table className="team-table"> 
      <thead>
      <tr>
          <th>Player</th>
          <th>Number</th>
          <th></th>
          <th></th>
       </tr>
      </thead>
      <tbody>

        {this.state.players.map((player) => {
          return (

      <tr key={player._id}>
          <td className="name-text">{player.name}</td>
          <td className="number-text">{player.number}</td>
          <td><button className="team-edit" onClick={(e) => this.showEdit (player)}>Edit</button></td>
          <td><button className="team-delete" onClick={(e) => this.showDelete (player)}>Delete</button></td>  
      </tr>
        )
   })}
        </tbody>
    </table>)}
    </div>

        <button className="team-add" onClick={this.showAdd}>Add a new player</button>
      </div>
  </HomeBackground>
  
    
    );
  }
}

export default withAuth(Team);