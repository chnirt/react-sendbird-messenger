import React, { Suspense, Fragment } from 'react'
import { useRoutes } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'
import './App.less'
import 'emoji-mart/css/emoji-mart.css'

import { PublicRoute, PrivateRoute } from './helpers'
import { Layout } from './layout'
import { Loadable } from './helpers'
import { PRIMARY_COLOR } from './constants'

TopBarProgress.config({
	barColors: {
		0: PRIMARY_COLOR,
		0.5: PRIMARY_COLOR,
		'1.0': PRIMARY_COLOR,
	},
	shadowBlur: 5,
})

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
					<Loadable route='login' />
				</PublicRoute>
			),
		},
		{
			path: '/register',
			element: (
				<PublicRoute>
					<Loadable route='register' />
				</PublicRoute>
			),
		},
		{
			path: 'dashboard',
			element: (
				<PrivateRoute>
					<Layout>
						<Loadable route='dashboard' />
					</Layout>
				</PrivateRoute>
			),
		},
		{
			path: '*',
			element: <Loadable route='notfound' />,
		},
	])

	return (
		<Fragment>
			<Suspense fallback={<TopBarProgress />}>{element}</Suspense>
		</Fragment>
	)
}

export default App
