import React, { Fragment } from 'react'

// import { useAuth } from '../context/authContext'

export const Layout = ({ children }) => {
	// const { logout } = useAuth()

	return (
		<Fragment>
			{/* <button onClick={logout}>Logout</button>
			<br /> */}
			{children}
		</Fragment>
	)
}
