import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Team from './pages/Team';
import Calendar from './pages/CalendarPage';
import TrainingPage from './pages/TrainingPage'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';




class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path='/calendar'component={Calendar} />
          <PrivateRoute exact path='/training/:id' component={TrainingPage}/>
          <PrivateRoute exact path="/team" component={Team} />
        </Switch>
      </div>
    );
  }
}

export default App;
