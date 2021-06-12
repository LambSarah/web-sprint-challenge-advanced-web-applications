import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import { axiosWithAuth } from './helpers/axiosWithAuth'
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'

import "./styles.scss";

function App() {
  const logout = () => {
    axiosWithAuth().post('/logout')
      .then(res => {
        localStorage.removeItem('token')
        window.location.href = './login'
      })
      .catch(err => {
        console.log(err)
      }
      )
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="#" onClick={logout}>logout</a>
        </header>

        <PrivateRoute exact path='/protected' component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.