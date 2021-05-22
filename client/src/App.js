import React from 'react'
import LoginPage from './components/LoginPage/LoginPage'
import ChatPage from './components/ChatPage/ChatPage'
import { SocketProvider } from './context/socket'
import { MainProvider } from './context/main'
import { UsersProvider } from './context/users'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <MainProvider>
        <UsersProvider>
          <SocketProvider>
            <Router>
              <Switch>
                <Route exact path='/' component={LoginPage} />
                <Route path='/chat' component={ChatPage} />
              </Switch>
            </Router>
          </SocketProvider>
        </UsersProvider>
      </MainProvider>
    )
  }
}


export default App;
