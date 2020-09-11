import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export function Loading({ spinning = false, children }) {
    return (
        <Spin
            style={{ maxHeight: '100vh' }}
            spinning={spinning}
            indicator={antIcon}
        >
            {children}
        </Spin>
    )
}
