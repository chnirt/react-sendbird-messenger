import React, { Fragment } from 'react'

import { useDeviceDetect } from '@hooks'
import Web from './web'
import Mobile from './mobile'

export default function Dashboard() {
    const { isMobile } = useDeviceDetect()

    return <Fragment>{isMobile ? <Mobile /> : <Web />}</Fragment>
}
