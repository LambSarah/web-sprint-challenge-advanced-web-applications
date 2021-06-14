//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './Login'

const PrivateRoute = props => {
	const { component: Component, ...rest } = props;
	return (<Route
		{...rest}
		render={(props) => {
			if (localStorage.getItem('token')) {
				console.log('PrivateRoute says =======REDIRECTING TO COMPONENT=======')
				return <Component {...props} />
			} else {
				console.log('PrivateRoute says =======UH OH=======')
				return (<Redirect to={Login} />)
			}
		}
		} />)
}
export default PrivateRoute

