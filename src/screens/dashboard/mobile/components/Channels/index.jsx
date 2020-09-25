import React, { Fragment } from 'react'

import { Body, Header } from './components'

export function Channels({
    handleLogout = () => {},
    handleShowChannel = () => {},
}) {
    return (
        <Fragment>
            <Header handleLogout={handleLogout} />
            <Body handleShowChannel={handleShowChannel} />
        </Fragment>
    )
}
