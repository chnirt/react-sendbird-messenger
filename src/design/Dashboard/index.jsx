import React, { Fragment } from 'react'

import { useDeviceDetect } from '@hooks'
import { DashboardProvider } from '@context'
import Web from './web'
import Mobile from './mobile'

export default function Dashboard() {
    const { isMobile } = useDeviceDetect()

    return (
        <Fragment>
            <DashboardProvider>
                {isMobile ? <Mobile /> : <Web />}
            </DashboardProvider>
        </Fragment>
    )
}
