import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { FirebaseProvider, AuthProvider } from './context'

test('renders learn react link', () => {
	const history = createMemoryHistory()
	history.push('/some/bad/route')
	const { getByText } = render(
		<FirebaseProvider>
			<AuthProvider>
				<Router history={history}>
					<App />
				</Router>
			</AuthProvider>
		</FirebaseProvider>
	)
	expect(getByText('SendBird Messenger')).toHaveTextContent(
		'SendBird Messenger'
	)
})
