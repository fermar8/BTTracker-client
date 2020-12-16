import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
import './Login.css'


class Signup extends Component {
  state = { username: "", 
  team: "", 
  email: "",
  password: "", 
};
    
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, team, email, password} = this.state;

    this.props.signup( username, team, email, password );
  }
  
  render() {
    const { username, team, email, password } = this.state;
    return (
      
        <form onSubmit={this.handleFormSubmit}>
         <div className="container">
           <h1>Sign up</h1>
           <p> Fill in this form to create an account.</p>

          <label className="login-label">Username:</label>
          <input className="login-input" type="text" name="username" value={username} onChange={this.handleChange} />

          <label className="login-label">Team:</label>
          <input className="login-input" type="text" name="team" value={team} onChange={this.handleChange} />

          <label className="login-label">Email:</label>
          <input className="login-input" type="text" name="email" value={email} onChange={this.handleChange} />

          
          <label className="login-label">Password:</label>
          <input className="login-input" type="password" name="password" value={password} onChange={this.handleChange} />  
    

          <button className="login-button" type="submit"> Sign up </button>


      <div className="clearfix">
        <p>Already have an account?</p>
        <Link className="login-link" to={"/login"}> Go to login</Link>
    </div>
   </div>
  </form>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;