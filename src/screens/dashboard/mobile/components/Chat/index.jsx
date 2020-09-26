import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Drawer, Typography } from 'antd'

import { MemoizedScrollToBottom, MessageSkeleton } from '@components'
import { useDashboard, useSendBird } from '@context'
// import { getMessages } from '@mock'
import { Header, Footer, MessageItem } from './components'
import { messageDto } from '@dto'
import { Calling, Detail, IncomingCall } from './screens'
import { formatTypingUsers } from '@utils'

const { Text } = Typography

export function Chat({ visible = false, handleCloseChannel = () => {} }) {
    const {
        channel,
        typingMembers,
        messagesLoading,
        setMessagesLoading,
        messages,
        setMessages,
        prevMessageListQuery,
        setPrevMessageListQuery,
        setTypingMembers,
        setDirectCall,
        setMediaAccess,
        setShowVideoCall,
        directCall,
    } = useDashboard()
    const {
        createPreviousMessageListQuery,
        onMessageReceived,
        onTypingStatusUpdated,
        requireMediaAccess,
        dial,
        accept,
        onRinging,
        onAudioInputDeviceChanged,
        onAudioOutputDeviceChanged,
        onVideoInputDeviceChanged,
        dispose,
    } = useSendBird()

    const [showDetail, setShowDetail] = useState(false)
    const [showIncomingCall, setShowIncomingCall] = useState(false)
    const [showCalling, setShowCalling] = useState(false)

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
        listenOnTypingStatusUpdated()

        listenOnRinging()
        listenOnAudioInputDeviceChanged()
        listenOnAudioOutputDeviceChanged()
        listenOnVideoInputDeviceChanged()
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

    const listenOnRinging = async () => {
        const { call } = await onRinging()
        console.log(call.caller.nickname, call.caller.userId)

        const mediaAccess = await requireMediaAccess()
        setMediaAccess(mediaAccess)

        setDirectCall(call)
        setShowIncomingCall(true)

        call.onEstablished = (call) => {
            // ...
            console.log('onEstablished', call)
        }

        call.onConnected = (call) => {
            // ...
            console.log('onConnected', call)
        }

        call.onEnded = (call) => {
            // ...
            console.log('onEnded')
            call.end()
            dispose(mediaAccess)
            setDirectCall(null)
            setShowVideoCall(false)
            setShowCalling(false)
        }

        call.onRemoteAudioSettingsChanged = (call) => {
            // ...
            console.log('onRemoteAudioSettingsChanged', call)
            if (call.isRemoteAudioEnabled) {
                console.log('isRemoteAudioEnabled', call)
                // The remote user has been unmuted.
                // TODO: Display an unmuted icon.
            } else {
                console.log('isLocalAudioEnabled', call)

                // The remote user has been muted.
                // TODO: Display and toggles a muted icon.
            }
        }

        call.onRemoteVideoSettingsChanged = (call) => {
            // ...
            console.log('onRemoteVideoSettingsChanged', call)
        }
    }

    const listenOnAudioInputDeviceChanged = async () => {
        const { call } = await onAudioInputDeviceChanged()
        console.log(call)
    }

    const listenOnAudioOutputDeviceChanged = async () => {
        const { call } = await onAudioOutputDeviceChanged()
        console.log(call)
    }

    const listenOnVideoInputDeviceChanged = async () => {
        const { call } = await onVideoInputDeviceChanged()
        console.log(call)
    }

    const handleAudioCall = () => {
        console.log('handleAudioCall')
    }
    const handleVideoCall = () => {
        setShowIncomingCall(false)
        setShowCalling(true)

        setTimeout(async () => {
            const mediaAccess = await requireMediaAccess()
            // console.log(mediaAccess)

            const callee = channel.members.find(
                (element) => element.userId !== localStorage.getItem('userId')
            ).userId
            const call = await dial(callee)
            // console.log(call)
            setMediaAccess(mediaAccess)
            setDirectCall(call)
        }, 500)
    }

    const handleShowDetail = () => setShowDetail(true)

    const handleCloseDetail = () => setShowDetail(false)

    const handleDeclineIncomingCall = () => {
        directCall.end()
        setShowIncomingCall(false)
    }

    const handleCallIncomingCall = () => {
        setShowIncomingCall(false)
        setShowCalling(true)

        setTimeout(async () => {
            accept(directCall)
        }, 500)
    }

    const handleEndCalling = () => {
        setShowCalling(false)
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
        <Drawer
            headerStyle={{
                height: 60,
                padding: 0,
            }}
            title={
                <Header
                    visible={showDetail}
                    onCancel={handleCloseChannel}
                    showDetail={handleShowDetail}
                    handleAudioCall={handleAudioCall}
                    handleVideoCall={handleVideoCall}
                />
            }
            footerStyle={{ padding: 0 }}
            footer={<Footer />}
            bodyStyle={{ padding: 0 }}
            placement="right"
            closable={false}
            visible={visible}
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

            <Detail visible={showDetail} onCancel={handleCloseDetail} />
            <IncomingCall
                caller={directCall?.caller}
                visible={showIncomingCall}
                onCancel={handleDeclineIncomingCall}
                onOk={handleCallIncomingCall}
            />
            <Calling visible={showCalling} onCancel={handleEndCalling} />
        </Drawer>
    )
}
