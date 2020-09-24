import React, { lazy } from 'react'

export const Loadable = ({ route = 'Login', folder = 'screens', ...rest }) => {
    const MyComponent = lazy(() => {
        const myModule = import(`../${folder}/${route}`)
        return myModule
    })

    return <MyComponent {...rest} />
}
