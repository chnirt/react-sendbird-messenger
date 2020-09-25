import React, { Fragment } from 'react'

import { Body, Header } from './components'

export function Channels({ handleLogout = () => {} }) {
    return (
        <Fragment>
            <Header handleLogout={handleLogout} /> <Body />
        </Fragment>
    )
}
