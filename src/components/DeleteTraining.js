import React, { Component } from 'react';
import axios from 'axios';

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
      <>
      <p className= "delete-text">Are you sure you want to delete this training? All stats will be lost.</p>
      <button className="delete-training" onClick={this.deleteTraining}>Delete</button>

      </>
     
    )
  }
}

export default DeleteTraining;