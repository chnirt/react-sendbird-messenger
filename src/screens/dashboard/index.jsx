import React, { Fragment, useCallback, useLayoutEffect, useState } from 'react'

import { Loading } from '@components'
import { useDeviceDetect } from '@hooks'
import { DashboardProvider, useAuth, useFirebase, useSendBird } from '@context'
import Web from './web'
import Mobile from './mobile'

export default function Dashboard() {
    const { logout } = useAuth()
    const { logoutFB, authRef } = useFirebase()
    const { disconnect } = useSendBird()
    const { isMobile } = useDeviceDetect()

    const [loadingLogout, setLoadingLogout] = useState(false)

    const handleLogout = useCallback(() => {
        setLoadingLogout(true)
        setTimeout(() => {
            disconnect()
            logoutFB()
            logout()

            setLoadingLogout(false)
        }, 1000)
    }, [disconnect, logoutFB, logout])

    useLayoutEffect(() => {
        setLoadingLogout(true)
        authRef.current.onAuthStateChanged(async (user) => {
            if (user !== null) {
                // User is signed in.
                user.providerData.forEach((profile) => {
                    // console.log('Sign-in provider: ' + profile.providerId)
                    // console.log('  Provider-specific UID: ' + profile.uid)
                    // console.log('  Name: ' + profile.displayName)
                    // console.log('  Email: ' + profile.email)
                    // console.log('  Photo URL: ' + profile.photoURL)
                })
                // const snapshot = await getUsers({ email: value })
                // console.log(snapshot.docs)
                // setOptions(snapshot.docs.map((doc) => ({ ...doc, value: doc.id })))
                setLoadingLogout(false)
            } else {
                // No user is signed in.
                handleLogout()
            }
        })
    }, [authRef, handleLogout])

    return (
        <Fragment>
            <DashboardProvider>
                <Loading spinning={loadingLogout}>
                    {isMobile === null ? (
                        <Fragment />
                    ) : isMobile ? (
                        <Mobile handleLogout={handleLogout} />
                    ) : (
                        <Web handleLogout={handleLogout} />
                    )}
                </Loading>
            </DashboardProvider>
        </Fragment>
    )
}
