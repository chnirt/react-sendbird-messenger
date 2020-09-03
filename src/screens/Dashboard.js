import React from 'react'

export function Dashboard() {
	console.log(process.env)

	return <div>Dashboard {process.env.REACT_APP_NOT_SECRET_CODE}</div>
}
