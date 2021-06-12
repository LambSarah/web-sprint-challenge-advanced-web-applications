//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './Login'

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (<Route {...rest} render={
		(props) => {
			if (localStorage.getItem('token')) {
				return <Component {...props} />
			} else {
				return (<><h2>Uh oh!</h2> <Redirect to={Login} /> </>)
			}
		}
	} />)
}
export default PrivateRoute

