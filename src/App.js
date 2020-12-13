import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import GlobalStyle from './styles/globalStyle'

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Team from './pages/Team';
import Calendar from './pages/CalendarPage';
import TrainingPage from './pages/TrainingPage'
import TeamStats from './pages/TeamStats'

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';




class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <GlobalStyle/>
        <Switch>
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path='/calendar'component={Calendar} />
          <PrivateRoute exact path='/training/:id' component={TrainingPage}/>
          <PrivateRoute exact path="/team" component={Team} />
          <PrivateRoute exact path='/team/stats' component={TeamStats}/>

        </Switch>
      </div>
    );
  }
}

export default App;
