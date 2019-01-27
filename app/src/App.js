import React, { Component } from 'react';
import './App.css';
import {Container} from 'reactstrap';
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Meth from './meth';
import Temp from './temp';
import Home from './home';
import Charttest from './charttest';


class App extends Component {
  render() {
    return (
      <Container>
        <Home/>
        <Switch>
          <Route exact path = "/temperatura" component={Temp}/>
          <Route exact path = "/metano" component={Meth}/>
          <Route exact path = "/chart" component={Charttest}/>
        </Switch>
      </Container>
    );
  }
}


export default App;
