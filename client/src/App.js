import logo from './logo.svg';
import React from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import ChatPage from './components/ChatPage/ChatPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/chat' component={ChatPage} />
        </Switch>
      </Router>
    )
  }
}


export default App;
