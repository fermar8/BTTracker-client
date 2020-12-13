import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import AllPlayerStats from './../components/AllPlayerStats'
//import teamPageService from './../lib/team-page-service';


class TeamStats extends Component {

    render() {

        return(
         <main>
           <div>
             <AllPlayerStats/>   
           </div>
        </main>
           )
    }
}


export default withAuth(TeamStats);