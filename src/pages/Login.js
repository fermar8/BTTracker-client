import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import './Login.css'
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (

      <form onSubmit={this.handleFormSubmit}>
         <div className="container">
           <h1>Login</h1>
           <p>Log into your account</p>
          
          <label className="login-label">Username:</label>
          <input className="login-input" type="text" name="username" value={username} onChange={this.handleChange}/>

          <label className="login-label">Password:</label>
          <input className="login-input" type="password" name="password" value={password} onChange={this.handleChange} />

          <button className="login-button" type="submit"> Login </button>
        
      <div className="clearfix">

        <p className="login-p">Still don't have an account?</p>
        <Link className="login-link" to={"/signup"}> Go to sign up</Link>
   </div>
   </div>
  </form>
    );
  }
}

export default withAuth(Login);
