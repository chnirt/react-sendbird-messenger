import React from 'react'
import { Typography } from 'antd'

import { useDashboard } from '@context'

const { Text } = Typography

export function Typing() {
    const { typingMembers } = useDashboard()

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 66,
                left: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 12,
                }}
                type="secondary"
                ellipsis={true}
            >
                {typingMembers}
            </Text>
        </div>
    )
}
