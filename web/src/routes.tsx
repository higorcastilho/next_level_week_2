import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom'

import { isAuthenticated } from './services/auth'

import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacherForm'
import Login from './pages/Login'

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
					<Redirect to={{ pathname: '/', state: { from: routeProps.location } }} />
				)
			}
		/>
	)
}


function Routes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Landing} />
			<PrivateRoute path="/study" component={TeacherList} />
			<Route path="/login" component={Login} />
			<Route path="/give-classes" component={TeacherForm} />
		</BrowserRouter>
	)
}

export default Routes