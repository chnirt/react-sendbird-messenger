import React, { Fragment, useEffect } from 'react'

import { MessageSkeleton, MemoizedScrollToBottom } from '@components'
import { THIRD_COLOR } from '@constants'
import { getMessages } from '@mock'
import { useDashboard } from '@context'

import { MessageItem, PiP } from './components'

export function Messages() {
    const {
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        showVideoCall,
    } = useDashboard()

    useEffect(() => {
        const fetchMessages = async () => {
            setMessagesLoading(true)
            try {
                const data = await getMessages()
                // console.log(data)
                setMessages(data)
                setMessagesLoading(false)
            } catch (error) {
                setMessagesLoading(false)
            }
        }

        fetchMessages()
    }, [setMessages, setMessagesLoading])

    const handleLoadMore = () => {}

    return (
        <Fragment>
            <MessageSkeleton
                loading={messagesLoading}
                rows={13}
                size="default"
                avatar
            >
                <MemoizedScrollToBottom
                    style={{
                        height: 'calc(100vh - 122px)',
                        borderBottom: `1px solid ${THIRD_COLOR}`,
                        overflowY: 'auto',
                        paddingBottom: 30,
                    }}
                    handleLoadMore={handleLoadMore}
                >
                    <PiP visible={showVideoCall} />
                    {messages.map((message, i) => (
                        <MessageItem key={i} message={message} />
                    ))}
                </MemoizedScrollToBottom>
            </MessageSkeleton>
        </Fragment>
    )
}
