import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';



import './../components/Navbar.css';

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <>
      
      {this.props.user ? (
      
      <div className="navbar">
        
        <Link to={'/team'} id='team-btn'>
         <p className="navbar-p">{this.props.user.team}</p><SportsBasketballIcon/>
        </Link>
        
        <Link to={'/calendar'} id='calendar-btn'>
        <p className="navbar-p">Calendar</p><CalendarTodayIcon/>
        </Link>
        
        <Link to={'/team/stats'} id='stats-btn'>
        <p className="navbar-p">Stats</p><EqualizerIcon/>
        </Link>

        <Link id='logout-btn' to={'/'} onClick={this.props.logout}><p className="navbar-p">Exit</p><ExitToAppIcon/></Link>
         
      </div>
        ) : null }
    
      </> 
    );
  }
}

export default withAuth(Navbar);
