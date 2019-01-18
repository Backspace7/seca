import React, { Component } from 'react';
import './App.css';
import {Button,Alert,Container} from 'reactstrap';
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Meth from './meth';
import Temp from './temp';
import Home from './home';


class App extends Component {
  render() {
    return (
      <Container>
        <Home/>
        <Switch>
          <Route exact path = "/temperatura" component={Temp}/>
          <Route exact path = "/metano" component={Meth}/>
        </Switch>
      </Container>
    );
  }
}


export default App;
