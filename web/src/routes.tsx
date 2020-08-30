import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom'

import { isAuthenticated } from './services/auth'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import Login from './pages/Login'
import Register from './pages/Register'
import DoneRegister from './pages/DoneRegister'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'

interface PrivateRouteProps extends RouteProps {
	component: any
}

const PrivateRoute = (props: PrivateRouteProps) => {
	const { component: Component, ...rest } = props

	return(
		<Route
			{...rest}
			render = { routeProps =>
				isAuthenticated() ? (
					<Component { ...routeProps } />
				) : (
					<Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
				)
			}
		/>
	)
}


function Routes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Landing} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/done-register" component={DoneRegister} />
			<Route path="/forgot-password" component={ForgotPassword} />
			<Route path="/reset-password" component={ResetPassword} />
			
			<PrivateRoute path="/study" component={TeacherList} />
			<PrivateRoute path="/give-classes" component={TeacherForm} />
			<PrivateRoute path="/profile" component={Profile} />
			<PrivateRoute path="/change-password" component={ChangePassword} />
		</BrowserRouter>
	)
}

export default Routes