import React from 'react'
import { cleanup, render, waitForElement } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { FirebaseProvider, AuthProvider, SendBirdProvider } from './context'

afterEach(cleanup)

test('renders learn react link', async () => {
    const { getByText } = render(
        <FirebaseProvider>
            <AuthProvider>
                <SendBirdProvider>
                    <Router>
                        <App />
                    </Router>
                </SendBirdProvider>
            </AuthProvider>
        </FirebaseProvider>
    )
    const lazyElement = await waitForElement(() =>
        getByText(/SendBird Messenger/i)
    )
    expect(lazyElement).toBeInTheDocument()
})
