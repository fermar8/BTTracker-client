import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
import './Signup.css'


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
      <div className="signup-div">
        <h1>Sign Up</h1>

      <div className="signup-div-form">

        <form onSubmit={this.handleFormSubmit}>

          <label className="form-label">Username:</label>
          <input className="form-input" type="text" name="username" value={username} onChange={this.handleChange} />

          <label className="form-label">Team:</label>
          <input className="form-input" type="text" name="team" value={team} onChange={this.handleChange} />

          <label className="form-label">email:</label>
          <input className="form-input" type="text" name="email" value={email} onChange={this.handleChange} />

          <div className="password-form">
          <label className="form-label">Password:</label>
          <input className="form-input" type="password" name="password" value={password} onChange={this.handleChange} />  
          </div>

          <button type="submit"> Sign up </button>
        </form>

      </div>
        <p>Already have an account?</p>
        <Link className="form-link" to={"/login"}> Login</Link>
    </div>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;