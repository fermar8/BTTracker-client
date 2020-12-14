import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import TrainingStats from './../components/TrainingStats'
import './../components/EditStats.css'


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
        const performanceId = this.props.performanceToEdit._id

        const {attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.state;    
        
        axios.put(
            `http://localhost:4000/api/performance/${performanceId}`, 
            {attendance, coachComments, ftAttempted, ftConverted,
            twoPAttempted, twoPConverted, threePAttempted, threePConverted}, 
            {withCredentials: true})
        .then( () => {
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

    componentDidMount() {
      const  {attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.props.performanceToEdit;

    this.setState({attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted});
    }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
  
    render(){      

        const {attendance, coachComments, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.state;  

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
                <td><textarea type="text" name="coachComments"
                value={coachComments} onChange= { (e) => this.handleChange(e) } /></td>
                <td><input type="number" name="ftConverted" value={ftConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="ftAttempted" value={ftAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="twoPConverted" value={twoPConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="twoPAttempted" value={twoPAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="threePConverted" value={threePConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="threePAttempted" value={threePAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><button type="submit">Submit</button></td>
                </tr>
              </tbody>
            </table>
          </form>     
        </div>
        )
  }

}


export default withRouter(EditStats);