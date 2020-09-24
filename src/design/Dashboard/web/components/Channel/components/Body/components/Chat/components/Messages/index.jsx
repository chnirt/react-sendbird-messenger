import React, { Fragment, useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Button } from 'antd'

import { MessageSkeleton, MemoizedScrollToBottom } from '@components'
import { THIRD_COLOR } from '@constants'
import { getMessages } from '@mock'
import { useDashboard } from '@context'
import Decline from '@assets/images/incomingcall/decline.png'
import { MessageItem } from './components'

export function Messages() {
    const {
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        showVideoCall,
        setShowVideoCall,
    } = useDashboard()

    const [activeDrags, setActiveDrags] = useState(0)

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

    const onStart = () => {
        setActiveDrags(+activeDrags)
    }

    const onStop = () => {
        setActiveDrags(-activeDrags)
    }

    const dragHandlers = { onStart, onStop }

    const handleEndCall = () => {
        setShowVideoCall(false)
    }

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
                    {showVideoCall && (
                        <Draggable bounds="parent" {...dragHandlers}>
                            <div
                                style={{
                                    borderRadius: 12,
                                    width: 1280 * 0.3,
                                    height: 720 * 0.6,
                                    margin: 10,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    zIndex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <video
                                    style={{
                                        width: 1280 * 0.3,
                                        height: 720 * 0.3,
                                        background: '#999',
                                        borderRadius: '12px 12px 0 0',
                                    }}
                                    id="local_video_element_id"
                                    autoPlay
                                />
                                <video
                                    style={{
                                        width: 1280 * 0.3,
                                        height: 720 * 0.3,
                                        background: '#ddd',
                                        borderRadius: '0 0 12px 12px',
                                    }}
                                    id="remote_video_element_id"
                                    autoPlay
                                />
                                <Button
                                    style={{
                                        border: 0,
                                        position: 'absolute',
                                        bottom: 20,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    icon={
                                        <img
                                            style={{ height: 100 }}
                                            src={Decline}
                                            alt="decline"
                                        />
                                    }
                                    type="ghost"
                                    size="large"
                                    onClick={handleEndCall}
                                />
                            </div>
                        </Draggable>
                    )}
                    {messages.map((message, i) => (
                        <MessageItem key={i} message={message} />
                    ))}
                </MemoizedScrollToBottom>
            </MessageSkeleton>
        </Fragment>
    )
}
