import React, { useLayoutEffect } from 'react'
import { Typography } from 'antd'

import { useDashboard, useSendBird } from '@context'
import { formatTypingUsers } from '@utils'

const { Text } = Typography

export function Typing() {
    const { channel, typingMembers, setTypingMembers } = useDashboard()
    const { onTypingStatusUpdated } = useSendBird()

    useLayoutEffect(() => {
        listenOnTypingStatusUpdated()
    })

    async function listenOnTypingStatusUpdated() {
        const { groupChannel } = await onTypingStatusUpdated()

        // console.log(channel.url, groupChannel.url)
        if (channel.url === groupChannel.url) {
            var members = groupChannel.getTypingMembers()

            // console.log(members)

            members = members.map((member) => member.nickname)
            const typingUsers = formatTypingUsers(members)

            setTypingMembers(typingUsers)
        }
    }

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
