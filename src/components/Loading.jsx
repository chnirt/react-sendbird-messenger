import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export function Loading({ spinning = false, children }) {
	if (children) {
		return (
			<Spin
				style={{ maxHeight: 'none' }}
				spinning={spinning}
				indicator={antIcon}
			>
				{children}
			</Spin>
		)
	}
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Spin style={{}} spinning={true} indicator={antIcon} />
		</div>
	)
}
