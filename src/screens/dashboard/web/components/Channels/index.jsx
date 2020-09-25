import React, { Fragment } from 'react'

import { Header, Body } from './components'

export function Channels({ handleLogout = () => {} }) {
    return (
        <Fragment>
            <Header handleLogout={handleLogout} /> <Body />
        </Fragment>
    )
}
