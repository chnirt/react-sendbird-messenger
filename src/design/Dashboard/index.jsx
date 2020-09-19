import React, { Fragment } from 'react'

import { Loading } from '@components'
import { Channels, Channel } from './components'

export default function Dashboard() {
    return (
        <Fragment>
            <Loading spinning={false}>
                Dashboard <Channels /> <Channel />
            </Loading>
        </Fragment>
    )
}
