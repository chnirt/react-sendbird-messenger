import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { HashRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import {
    DarkProvider,
    I18nProvider,
    AuthProvider,
    FirebaseProvider,
    SendBirdProvider,
} from '@context'
import { MyConsole } from '@config'
import '@assets/fonts/CutiveMono-Regular.ttf'
import '@assets/fonts/Hanalei-Regular.ttf'

MyConsole.run()

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        environment: process.env.NODE_ENV,
        dsn: process.env.REACT_APP_ST_DSN,
        release: 'react-sendbird-messenger@' + process.env.npm_package_version,
        integrations: [
            new Integrations.BrowserTracing({
                tracingOrigins: [
                    'https://react-sendbird-messenger.vercel.app/',
                ],
            }),
        ],
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
                            <HashRouter>
                                <App />
                            </HashRouter>
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
