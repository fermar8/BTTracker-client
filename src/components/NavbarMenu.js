import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';



import './../components/Navbar.css';

class NavbarMenu extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <>
      
      {this.props.user ? (
      
     <div className="flex-menu">
      <span onClick={this.props.toggleMenu} className="close-menu">&times;</span>
        <div className="align-menu">
      <Link onClick={this.props.toggleMenu} to={'/calendar'} className='element-menu'>
        <p className="menu-p">Calendar</p><CalendarTodayIcon/>
        </Link>
        
        <Link onClick={this.props.toggleMenu} to={'/team/stats'} className='element-menu'>
        <p className="menu-p">Stats</p><EqualizerIcon/>
        </Link>

        <div onClick={this.props.toggleMenu} className='element-menu'>
        <p className="menu-p">Exit</p><ExitToAppIcon onClick={this.props.logout}/>
        </div>

        </div>
      </div>
        ) : null }
    
      </> 
    );
  }
}

export default withAuth(NavbarMenu);