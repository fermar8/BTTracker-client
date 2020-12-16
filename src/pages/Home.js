import React from 'react'
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import './../pages/Home.css'

function Home() {
  return (
    <div className="home"> 
      <h1>Basketball Training Tracker</h1>
     <div className="button-div">
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
   </div>
  )
}

export default withAuth(Home);