import React, { lazy, Suspense } from 'react'
import { Loading } from '../components'

export const Loadable = ({ route = '', ...rest }) => {
	const MyComponent = lazy(() => {
		return import(`../screens/${route}`)
	})

	return (
		<Suspense fallback={<Loading />}>
			<MyComponent {...rest} />
		</Suspense>
	)
}
