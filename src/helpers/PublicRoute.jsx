import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@context'

export function PublicRoute({ children }) {
    let { isAuth } = useAuth()
    let location = useLocation()

    return isAuth ? (
        <Navigate
            to={{
                pathname: 'dashboard',
                state: { from: location },
            }}
        />
    ) : (
        children
    )
}
