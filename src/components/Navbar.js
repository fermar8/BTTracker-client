import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import NavbarMenu from './NavbarMenu'
import './../components/Navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMenuDisplayed: false
    }
  }


 toggleMenu = () => {
    this.setState({isMenuDisplayed: !this.state.isMenuDisplayed})
  }

  openMenu = () => {
    this.setState({isMenuDisplayed: true})
  }

  render() {
    return (
      <>

      {this.props.user ? (
    <div>
      <div className="navbar">
        
        <Link to={'/team'} id='team-btn'>
         <p className="navbar-p">{this.props.user.team}</p><SportsBasketballIcon/>
        </Link>

        <div className="burger">
          <span onClick={this.openMenu} className="burger-span"></span>
          <span onClick={this.openMenu} className="burger-span"></span>
          <span onClick={this.openMenu} className="burger-span"></span>
          {this.state.isMenuDisplayed ? 
      <NavbarMenu toggleMenu={this.toggleMenu}/>  :null  }
        </div>
      </div>

    </div>
        ) : null }
    
      </> 
    );
  }
}

export default withAuth(Navbar);
