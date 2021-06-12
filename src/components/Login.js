import Axios from "axios";
import React, { useEffect, useState } from "react";
import { push } from 'react-router-dom'

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

  const [isLoading, setIsLoading] = useState(false)

  const attemptLogin = evt => {
    evt.preventDefault()
    if (credentials.username === '' || credentials.password === '') {
      setError('Username or Password not valid.')
    } else if (credentials.username === 'Lambda'
      && credentials.password === 'i<3Lambd4') {
      setIsLoading(true)
      Axios.post('http://localhost:5000/api/login', credentials)
        .then(res => {
          localStorage.setItem('token', res.data.payload)
          setIsLoading(false)

          props.history.push('/protected')
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
  }

  const handleChange = evt => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value
    })
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
            data-testid="username"
          />
          <input type='password'
            name='password'
            onChange={handleChange}
            value={credentials.password}
            data-testid="password"
          />
        </form>
      </div>

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