import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

export function Typing() {
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
                {/* {typingMembers} */}
                xxxx
            </Text>
        </div>
    )
}
