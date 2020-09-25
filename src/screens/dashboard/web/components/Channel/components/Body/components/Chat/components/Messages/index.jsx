import React, { Fragment, useEffect, useLayoutEffect } from 'react'

import { MessageSkeleton, MemoizedScrollToBottom } from '@components'
import { THIRD_COLOR } from '@constants'
// import { getMessages } from '@mock'
import { useDashboard, useSendBird } from '@context'
import { messageDto } from '@dto'
import { MessageItem, PiP } from './components'

export function Messages() {
    const {
        messagesLoading,
        setMessagesLoading,
        channel,
        messages,
        prevMessageListQuery,
        setPrevMessageListQuery,
        setMessages,
        showVideoCall,
    } = useDashboard()
    const { createPreviousMessageListQuery, onMessageReceived } = useSendBird()

    useEffect(() => {
        const fetchMessages = async () => {
            setMessagesLoading(true)
            try {
                // const data = await getMessages()

                const prevMessageListQueryData = await createPreviousMessageListQuery(
                    channel,
                    20
                )
                // console.log(prevMessageListQueryData)

                setPrevMessageListQuery(prevMessageListQueryData)

                prevMessageListQueryData.load((messages, error) => {
                    if (error) {
                        return console.log(error)
                    }

                    const messagesDto = messages.map((element) =>
                        messageDto(channel, element)
                    )

                    if (channel.channelType === 'group') {
                        channel.markAsRead()
                    }

                    // console.log(messagesDto)

                    setMessages(messagesDto)
                    setMessagesLoading(false)
                })
            } catch (error) {
                setMessagesLoading(false)
            }
        }

        fetchMessages()
    }, [
        setMessages,
        setMessagesLoading,
        channel,
        createPreviousMessageListQuery,
        setPrevMessageListQuery,
    ])

    useLayoutEffect(() => {
        listenOnMessageReceived()
    })

    const listenOnMessageReceived = async () => {
        const { message } = await onMessageReceived()
        if (channel.url === message.channelUrl) {
            const formatMessage = messageDto(channel, message)
            setMessages((prevState) => [...prevState, formatMessage])
            if (channel.channelType === 'group') {
                channel.markAsRead()
            }
        }
    }

    const handleLoadMore = async () => {
        if (prevMessageListQuery) {
            prevMessageListQuery.load(function (messages, error) {
                if (error) {
                    return console.log(error)
                }

                const messagesDto = messages.map((element) =>
                    messageDto(channel, element)
                )

                setMessages((prevState) => [...messagesDto, ...prevState])
            })
        }
    }

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
