import React, { lazy } from 'react'

export const Loadable = ({ route = '', ...rest }) => {
	const MyComponent = lazy(() => {
		return import(`../screens/${route}`)
	})

	return <MyComponent {...rest} />
}
