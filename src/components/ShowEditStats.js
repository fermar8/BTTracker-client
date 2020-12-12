import React, { Component } from 'react';
import axios from 'axios';


class Stats extends Component {
  constructor(props){
      super(props);
      this.state = { 
          isDisplayed: true,
          stats: []
      }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/api/training/${id}`)
        .then( (response ) => {
            const stats = response.data.stats
            const training = response.data;
            const {date, exercises, notes} = training;
            this.setState({date, exercises, notes, stats: [...stats]});
        })
        .catch((err) => console.log(err))
}
  

  handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div className="add-player-form">
        <p>Add new player</p>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Name:</label>
          <input type="text" 
            name="name" 
            value={this.state.name} 
            onChange={ (e) => this.handleChange(e) }
          />
          
          <label>Number:</label>
          <input type="text" 
            name="number" 
            value={this.state.number} 
            onChange={ (e) => this.handleChange(e) } 
          />

          <label>Email:</label>
          <input type="text"
            name="email" 
            value={this.state.email} 
            onChange={ (e) => this.handleChange(e) } 
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Stats;