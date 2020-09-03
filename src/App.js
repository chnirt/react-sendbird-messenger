import React from 'react'
import './App.less'

import { useRoutes } from 'react-router-dom'

import { PublicRoute, PrivateRoute } from './helpers'
import { Login, Register, Dashboard, NotFound } from './screens'

import { Layout } from './layout'

function App() {
	// We removed the <BrowserRouter> element from App because the
	// useRoutes hook needs to be in the context of a <BrowserRouter>
	// element. This is a common pattern with React Router apps that
	// are rendered in different environments. To render an <App>,
	// you'll need to wrap it in your own <BrowserRouter> element.
	let element = useRoutes([
		// A route object has the same properties as a <Route>
		// element. The `children` is just an array of child routes.
		{
			path: '/',
			element: (
				<PublicRoute>
					<Login />
				</PublicRoute>
			),
		},
		{
			path: '/register',
			element: (
				<PublicRoute>
					<Register />
				</PublicRoute>
			),
		},
		{
			path: 'dashboard',
			element: (
				<PrivateRoute>
					<Layout>
						<Dashboard />
					</Layout>
				</PrivateRoute>
			),
		},
		{
			path: '*',
			element: <NotFound />,
		},
	])

	return element
}

export default App
