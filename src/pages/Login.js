import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import './Login.css'
import {HomeBackground} from "./../styles/homeBackground"
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", 
  password: "", 
  errorMessage: false };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({notFoundMessage: false})
    const { username, password } = this.state;

    if (username === "" || password === ""){
      this.setState({errorMessage: "Must fill all fields in the form"});
      return;
    }
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
    if (this.props.error) {
      this.setState({errorMessage: "Username or password are invalid"});
      return;
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (

   <HomeBackground>
    <main className="login-main">
      <form onSubmit={this.handleFormSubmit}>
         <div className="container">
           <h1 className="title-login">Login</h1>
           <p className="please-login">Please log into your account</p>
          
          <label className="login-label">Username:</label>
          <input className="login-input" type="text" name="username" value={username} onChange={this.handleChange}/>

          <label className="login-label">Password:</label>
          <input className="login-input" type="password" name="password" value={password} onChange={this.handleChange} />

          
          <button className="login-button" type="submit"> Login </button>
        
      <div className="clearfix">
        <p className="error-message">{this.state.errorMessage}</p>
        <p className="login-p">Still don't have an account?</p>
        <Link className="login-link" to={"/signup"}> Go to sign up</Link>
   </div>
   </div>
  </form>
</main>
</HomeBackground>
    );
  }
}

export default withAuth(Login);
