import React, { lazy } from 'react'

export const Loadable = ({ route = 'Login', folder = 'screens', ...rest }) => {
    const MyComponent = lazy(() => {
        return import(`../${folder}/${route}`)
    })

    return <MyComponent {...rest} />
}
