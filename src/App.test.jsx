import React from 'react'
import {
	cleanup,
	render,
	wait,
	screen,
	waitForElement,
} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { FirebaseProvider, AuthProvider } from './context'

afterEach(cleanup)

test('renders learn react link', async () => {
	const history = createMemoryHistory()

	const { getByText } = render(
		<FirebaseProvider>
			<AuthProvider>
				<Router history={history}>
					<App />
				</Router>
			</AuthProvider>
		</FirebaseProvider>
	)

	const lazyElement = await waitForElement(() =>
		getByText(/SendBird Messenger/i)
	)

	expect(lazyElement).toBeInTheDocument()
})
