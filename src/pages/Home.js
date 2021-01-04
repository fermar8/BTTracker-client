import React from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import {HomeBackground} from "./../styles/homeBackground"
import './Login.css'

function Home() {
  return (
  <HomeBackground>
  <main className="home-main">
      <h1 className="home-title">Basketball Training Tracker</h1>

      <p className="home-text">Better manage your team. </p>
       
      <p className="home-text">Please login or sign up.</p>
       

      <div>
      <Link to="/login">
        <button className="home-button">Login</button>
      </Link>
      <Link to="/signup">
        <button className="home-button">Sign Up</button>
      </Link>
    </div>
  </main>
</HomeBackground>
  )
}

export default withAuth(Home);