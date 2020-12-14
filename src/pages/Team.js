import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withAuth } from './../context/auth-context';
import AddPlayer from './../components/AddPlayerPage';
//import teamPageService from './../lib/team-page-service';

class Team extends Component {
  state = {
    players: []
  };
  
  componentDidMount() {
    axios.get('http://localhost:4000/api/team', {withCredentials: true})
      .then((response) => {
        console.log(response)
        this.setState({ players: response.data.players})
        console.log(this.state)
      })
  }

  render() {
    return (
      <div>
        <AddPlayer/>
      

      <div className="team-list">
        {this.state.players.map((player) => {
          return (
            <div key={player._id}> 
              <p>{player.name}</p>
              <p>{player.number}</p>
              <p>{player.email}</p>
              <Link 
               >Edit Player</Link>
            </div>
          )
        } )}
      </div>
    </div>
    );
  }
}

export default withAuth(Team);
