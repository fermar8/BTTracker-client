import React, { Component } from 'react';
import axios from 'axios';
import './../pages/StatsAndTraining.css'

class DeleteTraining extends Component {
  constructor(props){
      super(props);
      this.state = {
          trainingToDelete: {}
      };
  }

    deleteTraining = (event) => {
        event.preventDefault()
        const {_id} = this.state.trainingToDelete

        console.log(_id)
        axios.delete(process.env.REACT_APP_API_URL + `/api/training/${_id}`, {withCredentials: true})
          .then( () => this.props.history.push('/calendar') )
          .catch( (err) => console.log(err))
    }

    componentDidMount() {
        console.log('props', this.props)
      this.setState({trainingToDelete: this.props.training});
      }

  render(){
    return(
    <div className="details-training-edit">
        <div className="cross-training-delete"><span onClick={this.props.showComponent} className="close-training-popup">&times;</span>
           <div className="training-delete-container">
            <p className= "delete-training-text">Are you sure you want to delete this training? All stats will be lost.</p>
            <button className="delete-training-btn" onClick={this.deleteTraining}>Delete</button>
           </div>
        </div>
    </div>
     
    )
  }
}

export default DeleteTraining;