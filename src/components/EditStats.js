import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router'
import './../pages/StatsAndTraining.css'


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
            threePConverted: "",
            playerName: "" };
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
   
      const playerName = this.props.performanceToEdit.name

    this.setState({attendance, attended, date, ftAttempted, ftConverted,
        twoPAttempted, twoPConverted, threePAttempted, threePConverted, playerName});
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
       <div className="details-training-edit">
        <div className="player-name-title"><h1>{this.state.playerName}</h1></div>
        <span onClick={this.props.showComponent} className="close-training-popup">&times;</span>
         <form className="align-training-form" onSubmit={this.handleFormSubmit}>
            <div className="element-training-edit">
              <label>Attendance</label>
              <button className="attendance-button" onClick={(e) => this.toggleAttendance (e)}>{attended}</button>
            </div>

            <div className="element-training-edit">
              <label>Free Throws</label>
              <input type="number" name="ftConverted" value={ftConverted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="element-training-edit">
              <label>Free Throws Attempted</label>
              <input type="number" name="ftAttempted" value={ftAttempted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="element-training-edit">
              <label>Two Points</label>
              <input type="number" name="twoPConverted" value={twoPConverted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="element-training-edit">
              <label>Two Points Attempted</label>
              <input type="number" name="twoPAttempted" value={twoPAttempted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="element-training-edit">
              <label>Three Points</label>
              <input type="number" name="threePConverted" value={threePConverted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="element-training-edit">
              <label>Three Points Attempted</label>
              <input type="number" name="threePAttempted" value={threePAttempted} onChange= { (e) => this.handleChange(e) }/>
            </div>

            <div className="button-training-submit">
                <button className="submit-edit-training" type="submit">Submit</button>
            </div>
          </form>     
        </div>
        )
  }

}


export default withRouter(EditStats);