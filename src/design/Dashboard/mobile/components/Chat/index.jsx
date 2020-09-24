import React, { useEffect, useState } from 'react'
import { Drawer, Typography } from 'antd'

import { MemoizedScrollToBottom, MessageSkeleton } from '@components'
import { useDashboard } from '@context'
import { getMessages } from '@mock'
import { Header, Footer, MessageItem } from './components'
import { Detail, IncomingCall } from './screens'

const { Text } = Typography

export function Chat() {
    const {
        channel,
        typingMembers,
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
    } = useDashboard()
    const [showDetail, setShowDetail] = useState(false)
    const [showIncomingCall, setShowIncomingCall] = useState(false)

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
        <Drawer
            headerStyle={{
                height: 60,
                padding: 0,
            }}
            title={
                <Header
                    showDetail={showDetail}
                    setShowDetail={setShowDetail}
                    setShowIncomingCall={setShowIncomingCall}
                />
            }
            footerStyle={{ padding: 0 }}
            footer={<Footer />}
            bodyStyle={{ padding: 0 }}
            placement="right"
            closable={false}
            visible={!!channel}
            width="100%"
            push={false}
        >
            <div>
                <MessageSkeleton
                    loading={messagesLoading}
                    rows={13}
                    size="default"
                    avatar
                >
                    <MemoizedScrollToBottom
                        style={{
                            height: 'calc(100vh - 122px)',
                            paddingBottom: 30,
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                            WebkitOverflowScrolling: 'touch',
                        }}
                        handleLoadMore={handleLoadMore}
                    >
                        {messages.map((message, i) => (
                            <MessageItem key={i} message={message} />
                        ))}
                    </MemoizedScrollToBottom>
                </MessageSkeleton>
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
            </div>

            <Detail showDetail={showDetail} setShowDetail={setShowDetail} />
            <IncomingCall
                showIncomingCall={showIncomingCall}
                setShowIncomingCall={setShowIncomingCall}
            />
        </Drawer>
    )
}
