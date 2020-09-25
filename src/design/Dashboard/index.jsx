import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Loading } from '@components'
import { useDeviceDetect } from '@hooks'
import { DashboardProvider } from '@context'
import Web from './web'
import Mobile from './mobile'

export default function Dashboard() {
    let navigate = useNavigate()
    const { isMobile } = useDeviceDetect()

    const [loadingLogout, setLoadingLogout] = useState(false)

    const handleLogout = () => {
        setLoadingLogout(true)
        setTimeout(() => {
            navigate('/')

            setLoadingLogout(false)
        }, 1000)
    }

    return (
        <Fragment>
            <DashboardProvider>
                <Loading spinning={loadingLogout}>
                    {isMobile ? (
                        <Mobile handleLogout={handleLogout} />
                    ) : (
                        <Web handleLogout={handleLogout} />
                    )}
                </Loading>
            </DashboardProvider>
        </Fragment>
    )
}
