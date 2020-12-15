import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import AllPlayerStats from './../components/AllPlayerStats'
import './TeamStats.css'
//import teamPageService from './../lib/team-page-service';


class TeamStats extends Component {

    render() {

        return(
        
         <main className="center">
          <h1>Overall Performance</h1>
           <div>
             <AllPlayerStats/>   
           </div>
        </main>
     
           )
    }
}


export default withAuth(TeamStats);