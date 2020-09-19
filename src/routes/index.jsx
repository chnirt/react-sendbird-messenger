import React from 'react'
import { PublicRoute, PrivateRoute, Loadable } from '@helpers'
import { Layout } from '@layout'

export const designRoutes = [
    {
        path: '/',
        element: <Loadable route="Login" folder="design" />,
    },
    {
        path: '/register',
        element: <Loadable route="Register" folder="design" />,
    },
    {
        path: 'dashboard',
        element: (
            <Layout>
                <Loadable route="Dashboard" folder="design" />
            </Layout>
        ),
    },
    {
        path: '*',
        element: <Loadable route="Notfound" folder="design" />,
    },
]

export const mockRoutes = [
    {
        path: '/',
        element: <Loadable route="Login" folder="mock" />,
    },
    {
        path: '/register',
        element: <Loadable route="Register" folder="mock" />,
    },
    {
        path: 'dashboard',
        element: (
            <Layout>
                <Loadable route="Dashboard" folder="mock" />
            </Layout>
        ),
    },
    {
        path: '*',
        element: <Loadable route="Notfound" folder="mock" />,
    },
]

export const appRoutes = [
    // A route object has the same properties as a <Route>
    // element. The `children` is just an array of child routes.
    {
        path: '/',
        element: (
            <PublicRoute>
                <Loadable route="Login" folder="screens" />
            </PublicRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <Loadable route="Register" folder="screens" />
            </PublicRoute>
        ),
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <Layout>
                    <Loadable route="Dashboard" folder="screens" />
                </Layout>
            </PrivateRoute>
        ),
    },
    {
        path: '*',
        element: <Loadable route="Notfound" folder="screens" />,
    },
]
