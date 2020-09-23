import React from 'react'
import { Row, Typography } from 'antd'

import { formatHeaderTime, formatLastMessageStatus } from '@utils'
import { MessageBubble } from '@components'
import { PRIMARY_COLOR, THIRD_COLOR } from '@constants'
import { LastMessageStatus } from './components'

const { Text } = Typography

export function MessageItem({ message }) {
    // console.log(message)

    const id = message.id || ''
    const isFile = message.isFile
    const url = message.url
    const createdAt = formatHeaderTime(message.createdAt || new Date())
    const isAdmin = message.isAdmin
    const isAuthor = message.isAuthor
    const content = message.content || ''
    const unreadCount = message.unreadCount || 0
    const undeliveredCount = message.undeliveredCount || 0
    const status = formatLastMessageStatus(
        isAuthor,
        unreadCount,
        undeliveredCount
    )

    return (
        <Row
            style={{
                padding: '0 12px',
                display: 'flex',
                width: '100%',
            }}
            key={id}
        >
            <Row
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ margin: '16px 0' }}>{createdAt}</div>
            </Row>

            {isAdmin ? (
                <Row
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text type="secondary">{content}</Text>
                </Row>
            ) : (
                <Row
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: isAuthor ? 'flex-end' : 'flex-start',
                    }}
                >
                    <div>
                        <MessageBubble
                            w={300}
                            backgroundColor={
                                isAuthor ? PRIMARY_COLOR : THIRD_COLOR
                            }
                            color={isAuthor ? '#fff' : '#000'}
                            isFile={isFile}
                            url={url}
                            content={content}
                        />
                        {status && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: 6,
                                }}
                            >
                                <LastMessageStatus status={status} />
                            </div>
                        )}
                    </div>
                </Row>
            )}
        </Row>
    )
}
