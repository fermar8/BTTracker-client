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
      <div className="login-div">
    
        <h1>Login</h1>
  
     <div>

        <form onSubmit={this.handleFormSubmit}>
          
          <label className="form-label">Username:</label>
          <input className="login-input" type="text" name="username" value={username} onChange={this.handleChange}/>

          <label className="form-label">Password:</label>
          <input className="login-input" type="password" name="password" value={password} onChange={this.handleChange} />

          <button className="login-button" type="submit"> Login </button>
        </form>
      </div>

      <p>Still don't have an account?</p>
        <Link className="form-link" to={"/signup"}> Login</Link>
   </div>
    );
  }
}

export default withAuth(Login);
