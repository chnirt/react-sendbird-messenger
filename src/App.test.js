import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './context/authContext'

test('renders learn react link', () => {
	const history = createMemoryHistory()
	history.push('/some/bad/route')
	const { getByText } = render(
		<AuthProvider>
			<Router history={history}>
				<App />
			</Router>
		</AuthProvider>
	)
	expect(getByText('SendBird Messenger')).toHaveTextContent(
		'SendBird Messenger'
	)
})
