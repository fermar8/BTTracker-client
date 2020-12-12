import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import './../components/ShowEditStats'

class EditStats extends Component {
    constructor(props){
        super(props);
        this.state = { attendance: true, 
            coachComments: "", 
            ftAttempted: "",
            ftConverted: "",
            twoPAttempted: "",
            twoPConverted: "",
            threePAttempted: "",
            threePConverted: "" };
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const playerId = this.props.match.playerId;

        const {attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePconverted} = this.state;    
        
        axios.put(`http://localhost:4000/api/performance/${playerId}`, {attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePconverted})
        .then( () => {
          // this.props.getData(); // leave this comment - we will used it later
          this.setState({attendance: true, 
            coachComments: "", 
            ftAttempted: "",
            ftConverted: "",
            twoPAttempted: "",
            twoPConverted: "",
            threePAttempted: "",
            threePConverted: "" });
        })
        .catch( (err) => console.log(err) )
      }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
  
    render(){      
      return (
       <div>
            <form onSubmit={this.handleFormSubmit}>
              <label>Coach comments</label>
              <textarea type="text" name="comments"
              value= "" onChange= { (e) => this.handleChange(e) } />
              <label>FT</label>
              <input type="number" name="ft" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <label>FTA</label>
              <input type="number" name="fta" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <label>2P</label>
              <input type="number" name="two" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <label>2PA</label>
              <input type="number" name="twoatt" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <label>3P</label>
              <input type="number" name="three" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <label>3PA</label>
              <input type="number" name="threeatt" value= "0" onChange= { (e) => this.handleChange(e) }/>
              <button type="submit">Submit</button>
            </form>     
        </div>
        )
  }

}


export default withRouter(EditStats);