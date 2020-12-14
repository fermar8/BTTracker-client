import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import TrainingStats from './../components/TrainingStats'
import './../components/EditStats.css'


//get training/id and populate submit buttons form


class TrainingDetails extends Component {
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
        
        axios.put(`http://localhost:4000/api/performance/${playerId}`, 
                {attendance, coachComments, ftAttempted, ftConverted,
                twoPAttempted, twoPConverted, threePAttempted, threePconverted}, 
                {withCredentials: true})
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
       <div className="main-div">
         <form onSubmit={this.handleFormSubmit}>
            <table>
             <thead>
              <tr>
                  <th>Comments</th>
                  <th>FT</th>
                  <th>FTA</th>
                  <th>2P</th>
                  <th>2PA</th>
                  <th>3P</th>
                  <th>3PA</th>
                  <th></th>
              </tr>
             </thead>
             <tbody>
              <tr>
                <td><textarea type="text" name="comments"
                value= "" onChange= { (e) => this.handleChange(e) } /></td>
                <td><input type="number" name="ft" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="fta" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="two" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="twoatt" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="three" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="threeatt" value= "0" onChange= { (e) => this.handleChange(e) }/></td>
                <td><button type="submit">Submit</button></td>
                </tr>
              </tbody>
            </table>
          </form>     
        </div>
        )
  }

}


//export default withRouter(TrainingDetails);