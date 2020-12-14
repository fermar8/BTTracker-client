import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withAuth } from './../context/auth-context';
import AddPlayer from './../components/AddPlayerPage';
import EditPlayer from './../components/EditPlayerPage'
import './../pages/Team.css'
//import teamPageService from './../lib/team-page-service';

class Team extends Component {
  state = {
    players: [],
    displayEdit: false,
    displayAdd: false,
    playerToEdit: {}
  };
  
  componentDidMount() {
    axios.get('http://localhost:4000/api/team', {withCredentials: true})
      .then((response) => {
        console.log(response)
        this.setState({ players: response.data.players})
        console.log(this.state)
      })
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



  render() {
    return (
      <div>



      {this.state.displayAdd ?
        <AddPlayer/> : null}
      {this.state.displayEdit ?
        <EditPlayer playerToEdit={this.state.playerToEdit} /> : null}
        

      <div className="team-list">
        <h1>Player List</h1>

        <button className="button" onClick={this.showAdd}>Add Player</button>

        {this.state.players.map((player) => {
          return (
           <div className="list">
            <div className="rows" key={player._id}> 
              <p className="p">{player.name} -</p>
              <p className="p">{player.number} -</p>
              <p className="p">{player.email}</p>
               
               <button className="button" onClick={(e) => this.showEdit (player)}>Edit Player</button>
            </div>
           </div>
          )
        } )}
      </div>
    </div>
    );
  }
}

export default withAuth(Team);