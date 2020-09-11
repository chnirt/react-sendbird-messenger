import React, { Fragment } from 'react'
import { Space, Skeleton } from 'antd'

export function MySkeleton({
    loading = false,
    rows = 1,
    children,
    size = 'default',
    avatar,
    avatarShape = 'circle',
}) {
    if (loading) {
        return [...Array(rows).keys()].map((i) => (
            <Fragment key={i}>
                <Space style={{ padding: 12, height: 60 }}>
                    {!!avatar && (
                        <Skeleton.Avatar
                            active={true}
                            size={size}
                            shape={avatarShape}
                        />
                    )}
                    <Skeleton.Input
                        style={{ minWidth: 308, width: 355 }}
                        active={true}
                        size={size}
                    />
                </Space>
            </Fragment>
        ))
    }

    return children
}
