import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withAuth } from './../context/auth-context';
import AddPlayer from './../components/AddPlayerPage';
import EditPlayer from './../components/EditPlayerPage';
import DeletePlayer from './../components/DeletePlayer'
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
    team: ""
  };
  

  getPlayers = () => {
    axios.get('http://localhost:4000/api/team', {withCredentials: true})
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
    this.getPlayers()
  }

 
  showAdd = () => {
    this.setState({
      displayAdd: !this.state.displayAdd
    })
  }


  showEdit(player) {
    this.setState({
      displayEdit: !this.state.displayEdit,
      playerToEdit: player})
  }

  showDelete(player) {
    this.setState({
      displayDelete: !this.state.displayDelete,
      playerToDelete: player})
  }



  render() {
    return (
  
      <div>

      {this.state.displayAdd ?
        <AddPlayer getPlayers={this.getPlayers}/> : null}
      {this.state.displayEdit ?
        <EditPlayer getPlayers={this.getPlayers} playerToEdit={this.state.playerToEdit} /> : null}
      {this.state.displayDelete ? 
        <DeletePlayer getPlayers={this.getPlayers} playerToDelete={this.state.playerToDelete} /> : null}
        

      <div className="team-list">
        <h1>Squad</h1>
  
        <main className="main">
    
    <div>
     <table> 
      <thead>
      <tr className="head">
          <th>Player</th>
          <th>number</th>
          <th>email</th>
          <th></th>
          <th></th>
       </tr>
      </thead>
      <tbody>

        {this.state.players.map((player) => {
          return (

      <tr className="text" key={player._id}>
          <td>{player.name}</td>
          <td>{player.number}</td>
          <td>{player.email}</td>
          <td><button className="button" onClick={(e) => this.showEdit (player)}>Edit Player</button></td>
          <td><button className="button-delete" onClick={(e) => this.showDelete (player)}>Delete Player</button></td>  
      </tr>
        )
   })}
        </tbody>
    </table>
    </div>
 </main>

        <button className="button-add" onClick={this.showAdd}>Add a new player</button>
      </div>
    </div>
    );
  }
}

export default withAuth(Team);