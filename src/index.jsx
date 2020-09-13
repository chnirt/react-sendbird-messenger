import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { BrowserRouter as Router } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import {
    DarkProvider,
    I18nProvider,
    AuthProvider,
    FirebaseProvider,
    SendBirdProvider,
} from '@context'

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.REACT_APP_ST_DSN,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    })
}

ReactDOM.render(
    <React.StrictMode>
        <DarkProvider>
            <I18nProvider>
                <FirebaseProvider>
                    <AuthProvider>
                        <SendBirdProvider>
                            <Router>
                                <App />
                            </Router>
                        </SendBirdProvider>
                    </AuthProvider>
                </FirebaseProvider>
            </I18nProvider>
        </DarkProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
