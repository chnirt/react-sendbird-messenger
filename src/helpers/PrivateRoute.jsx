import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '../context'

export function PrivateRoute({ children }) {
    let { isAuth } = useAuth()
    let location = useLocation()

    return isAuth ? (
        children
    ) : (
        <Navigate
            to={{
                pathname: '/',
                state: { from: location },
            }}
        />
    )
}
