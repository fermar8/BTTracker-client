import React from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import './../pages/Home.css'

function Home() {
  return (
    <div className="home"> 
      <h1>Home Page</h1>
      <Link to="/login">
        <button className="navbar-button">Login</button>
      </Link>
        <br />
      <Link to="/signup">
        <button className="navbar-button">Sign Up</button>
      </Link>
    </div>
  )
}

export default withAuth(Home);