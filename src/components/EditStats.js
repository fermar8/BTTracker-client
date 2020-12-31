import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import TrainingStats from './../components/TrainingStats'


class EditStats extends Component {
    constructor(props){
        super(props);
        this.state = { attendance: true,
            date: "",  
            ftAttempted: "",
            ftConverted: "",
            twoPAttempted: "",
            twoPConverted: "",
            threePAttempted: "",
            threePConverted: "" };
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const performanceId = this.props.performanceToEdit.perfId

        const {attendance, date, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.state;    
        
        axios.put(
          process.env.REACT_APP_API_URL + `/api/performance/${performanceId}`, 
            {attendance, date, ftAttempted, ftConverted,
            twoPAttempted, twoPConverted, threePAttempted, threePConverted}, 
            {withCredentials: true})
        .then( () => {
          this.props.getPerformances(); 
          this.setState({
            attendance: true, 
            date: "",
            attended: "",
            ftAttempted: "",
            ftConverted: "",
            twoPAttempted: "",
            twoPConverted: "",
            threePAttempted: "",
            threePConverted: "",
             });
        })
        .catch( (err) => console.log(err) )
      }

    componentDidMount() {
      const  {attendance, attended, date, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.props.performanceToEdit;

    this.setState({attendance, attended, date, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted});
    }
    
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    toggleAttendance = (e) => {
      e.preventDefault();
      this.setState({attendance: !this.state.attendance})
      if (this.state.attended === "Yes") {
      this.setState({attended: "No", 
      ftAttempted: "0",
      ftConverted: "0",
      twoPAttempted: "0",
      twoPConverted: "0",
      threePAttempted: "0",
      threePConverted: "0"})

     } else if (this.state.attended === "No") {
      this.setState({attended: "Yes"})
     } 
  }
  
    render(){      

        const {attended, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted} = this.state;  

      return (
      <div className="container-popup">
       <div className="cross-training-delete"><span onClick={this.props.showComponent} className="close-training-popup">&times;</span>
         <form className="training-delete-container" onSubmit={this.handleFormSubmit}>
            <table>
             <thead>
              <tr>
                  <th>Attendance</th>
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
                <td><button className="attendance-button" onClick={(e) => this.toggleAttendance (e)}>{attended}</button></td>
                <td><input type="number" name="ftConverted" value={ftConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="ftAttempted" value={ftAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="twoPConverted" value={twoPConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="twoPAttempted" value={twoPAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="threePConverted" value={threePConverted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><input type="number" name="threePAttempted" value={threePAttempted} onChange= { (e) => this.handleChange(e) }/></td>
                <td><button className="edit-button" type="submit">Submit</button></td>
                </tr>
              </tbody>
            </table>
          </form>     
        </div>
      </div>
        )
  }

}


export default withRouter(EditStats);