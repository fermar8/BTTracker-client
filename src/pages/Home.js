import React from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import './Login.css'
import SportsBasketballTwoToneIcon from '@material-ui/icons/SportsBasketballTwoTone';

function Home() {
  return (
  <main className="home-main">
    <div className="container"> 
      <h1 className="home-title">Welcome to Basketball Training Tracker</h1>
      <SportsBasketballTwoToneIcon className="basketball-icon"/>

      <p className="home-text">Here you will be able to better manage your team. </p>
       
      <p className="home-text">Please login or sign up.</p>
       

      <div>
      <Link to="/login">
        <button className="home-button">Login</button>
      </Link>
      <Link to="/signup">
        <button className="home-button">Sign Up</button>
      </Link>
    </div>
   </div>
  </main>
  )
}

export default withAuth(Home);