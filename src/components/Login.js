import axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

//import { axiosWithAuth } from '../helpers/axiosWithAuth'
const initialValues = {
  username: '',
  password: ''
}

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialValues)

  const [error, setError] = useState('')
  //replace with error state

  const { push } = useHistory();
  const [isLoading, setIsLoading] = useState(false)

  const LoadingIndicator = props.LoadingIndicator

  const attemptLogin = evt => {
    evt.preventDefault()
    if (credentials.username !== 'Lambda' || credentials.password !== 'School') {
      setError('Username or Password not valid.')
      console.log('Login says ============error set===========')
    } else {
      setIsLoading(true)
      console.log('=======ATTEMPTING LOGIN=======')
      axios.post('http://localhost:5000/api/login', credentials)
        .then(res => {
          console.log('Login says =======RECEIVING CREDENTIALS=======')
          localStorage.setItem('token', res.data.payload)
          setIsLoading(false)
          console.log('=======LOGIN SUCCESSFUL======')
          push('/protected')
        })
        .catch(err => {
          console.log('############LOGIN FAILED###########')
          console.log(err)
          setIsLoading(false)
        })
    }
  }

  const handleChange = evt => {
    setError('')
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    })
  }

  const buttonClicked = evt => {
    console.log(evt, '----------buttonClicked!------------')
    attemptLogin(evt);
  }
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Login</h2>
        <form onSubmit={attemptLogin}>
          <input type='text'
            name='username'
            onChange={handleChange}
            value={credentials.username}
            placeholder='username'
            data-testid="username"
            auto-complete='username'
          />
          <input type='password'
            name='password'
            onChange={handleChange}
            value={credentials.password}
            placeholder='password'
            data-testid="password"
            auto-complete='current-password'
          />
          <input type='button'
            value='Submit' onClick={buttonClicked} />
        </form>
      </div>
      {isLoading ? LoadingIndicator : ''}
      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.