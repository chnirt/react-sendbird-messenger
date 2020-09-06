import React, { Fragment } from 'react'
import { Space, Skeleton, Divider } from 'antd'

export function MessageSkeleton({
    loading = false,
    rows = 1,
    children,
    size = 'default',
    avatar,
    avatarShape = 'circle',
}) {
    if (loading) {
        return [...Array(rows).keys()].map((i) => (
            <Fragment>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: i % 2 === 0 && 'flex-end',
                    }}
                >
                    <Space
                        style={{
                            padding: 12,
                            height: 60,
                            flexDirection: i % 2 === 0 && 'row-reverse',
                        }}
                    >
                        {!!avatar && (
                            <Skeleton.Avatar
                                style={{
                                    marginLeft: i % 2 === 0 && 8,
                                }}
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
                </div>
                <Divider style={{ margin: 0 }} />
            </Fragment>
        ))
    }

    return children
}
