import React, { Fragment, useRef, useLayoutEffect, useState } from 'react'
import {
    Row,
    Col,
    Button,
    Avatar,
    Typography,
    Upload,
    Divider,
    Tooltip,
    Badge,
    Input,
    message,
    Collapse,
} from 'antd'
import {
    PhoneOutlined,
    VideoCameraOutlined,
    InfoCircleOutlined,
    PictureOutlined,
    SmileOutlined,
    LikeOutlined,
    LoadingOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { Picker } from 'emoji-mart'

import {
    Loading,
    Emoticons,
    MessageBubble,
    MessageSkeleton,
    MemoizedScrollToBottom,
} from '@components'
import { ReactComponent as Sent } from '@assets/images/chat/check.svg'
import { ReactComponent as Delivered } from '@assets/images/chat/tick.svg'
import { ReactComponent as Seen } from '@assets/images/chat/color-tick.svg'
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    THIRD_COLOR,
    FOURTH_COLOR,
    ONLINE,
    OFFLINE,
} from '@constants'
import { useAuth, useFirebase, useSendBird } from '@context'
import { Channels, EmptyChannel } from './components'
import {
    firstCharacterOfEachString,
    capitalizeFirstLetter,
    formatTypingUsers,
} from '@utils'
// import { useDeviceDetect } from '@hooks'

const { Title, Text } = Typography
const { Panel } = Collapse

export default function Dashboard() {
    const { logout } = useAuth()
    const { logoutFB, authRef } = useFirebase()
    const {
        disconnect,
        userListQuery,
        channelListQuery,
        getChannel,
        createPreviousMessageListQuery,
        sendUserMessage,
        sendFileMessage,
        onTypingStatusUpdated,
        onMessageReceived,
        markAsDelivered,
        onDeliveryReceiptUpdated,
        onReadReceiptUpdated,
        onChannelChanged,
        onUserReceivedInvitation,
        onUserLeft,
        joinChannel,
        leave,
        createChannelWithUserIds,
    } = useSendBird()
    // const { isMobile } = useDeviceDetect()

    const [loadingLogout, setLoadingLogout] = useState(false)
    const [showDetail, setShowDetail] = useState(true)

    const [channels, setChannels] = useState([])
    const [loadingChannels, setLoadingChannels] = useState(false)

    const [channel, setChannel] = useState(null)

    const [typingText, setTypingText] = useState('')
    const [typingMembers, setTypingMembers] = useState('')

    const [messages, setMessages] = useState([])
    const [loadingListMessages, setLoadingListMessages] = useState(false)

    const [channelUrl, setChannelUrl] = useState(null)

    const [prevMessageListQuery, setPrevMessageListQuery] = useState(null)

    const scrollRef = useRef()

    /**
     * MyAutoComplete - State
     */
    const [options, setOptions] = useState([])

    // const [showSettingDrawer, setShowSettingDrawer] = useState(false)

    /**
     * Firebase - Effect
     */
    useLayoutEffect(() => {
        authRef.current.onAuthStateChanged(async (user) => {
            if (user !== null) {
                // User is signed in.
                user.providerData.forEach((profile) => {
                    // console.log('Sign-in provider: ' + profile.providerId)
                    // console.log('  Provider-specific UID: ' + profile.uid)
                    // console.log('  Name: ' + profile.displayName)
                    // console.log('  Email: ' + profile.email)
                    // console.log('  Photo URL: ' + profile.photoURL)
                })
                // const snapshot = await getUsers({ email: value })
                // console.log(snapshot.docs)
                // setOptions(snapshot.docs.map((doc) => ({ ...doc, value: doc.id })))
            } else {
                // No user is signed in.
                disconnect()
                logout()
            }
        })
    }, [authRef, logout, disconnect])

    /**
     * SendBird - fetchChannels - Effect
     */
    useLayoutEffect(() => {
        fetchChannels()

        async function fetchChannels() {
            setLoadingChannels(true)
            const channels = await channelListQuery()
            // console.log(channels)
            channels
                .filter((channel) => channel.channelType === 'group')
                .map((channel) => channel.markAsDelivered())
            setChannels(channels)
            setLoadingChannels(false)
        }
    }, [channelListQuery, markAsDelivered])

    /**
     * SendBird - fetchChannel - Effect
     */
    useLayoutEffect(() => {
        async function fetchChannel(url) {
            const channel = await getChannel(url)
            setChannel(channel)
            joinChannel(channel)

            /**
             * SendBird - fetchMessages
             */
            fetchMessages()

            async function fetchMessages() {
                setLoadingListMessages(true)
                const prevMessageListQuery = await createPreviousMessageListQuery(
                    channel,
                    10
                )
                setPrevMessageListQuery(prevMessageListQuery)
                prevMessageListQuery.load(function (messages, error) {
                    if (error) {
                        return console.log(error)
                    }

                    // console.log(channel)

                    if (channel.channelType === 'group') {
                        channel.markAsRead()
                    }

                    setMessages(messages)
                    setLoadingListMessages(false)
                })
            }
        }

        if (channelUrl) {
            fetchChannel(channelUrl)
        }
    }, [
        getChannel,
        channel,
        joinChannel,
        createPreviousMessageListQuery,
        channelUrl,
    ])

    useLayoutEffect(() => {
        listenOnMessageReceived()
        listenOnTypingStatusUpdated()
        listenOnDeliveryReceiptUpdated()
        listenOnReadReceiptUpdated()
        listenOnChannelChanged()
        listenOnUserReceivedInvitation()
        listenOnUserLeft()
    })

    async function listenOnTypingStatusUpdated() {
        const { groupChannel } = await onTypingStatusUpdated()

        // console.log(channel.url, groupChannel.url)
        if (channel && channel.url === groupChannel.url) {
            var members = groupChannel.getTypingMembers()

            // console.log(members)

            members = members.map((member) => member.userId)
            const typingUsers = formatTypingUsers(members)

            setTypingMembers(typingUsers)
        }
    }

    async function listenOnMessageReceived() {
        const { message } = await onMessageReceived()
        if (channel && channelUrl === message.channelUrl) {
            setMessages((prevState) => [...prevState, message])
            if (channel.channelType === 'group') {
                channel.markAsRead()
            }
        }
    }

    async function listenOnDeliveryReceiptUpdated() {
        const { groupChannel } = await onDeliveryReceiptUpdated()

        // console.log('delivered', groupChannel)

        if (groupChannel.url === channel?.url) {
            setMessages((prevState) =>
                prevState.map((message) => {
                    if (
                        message.messageId === groupChannel.lastMessage.messageId
                    ) {
                        return groupChannel.lastMessage
                    }
                    return message
                })
            )
        }
    }

    async function listenOnReadReceiptUpdated() {
        const { groupChannel } = await onReadReceiptUpdated()

        // console.log('read', groupChannel)

        if (groupChannel.url === channel?.url) {
            setMessages((prevState) =>
                prevState.map((message) => {
                    if (
                        message.messageId === groupChannel.lastMessage.messageId
                    ) {
                        return groupChannel.lastMessage
                    }
                    return message
                })
            )
        }
    }

    async function listenOnChannelChanged() {
        const { channel } = await onChannelChanged()
        // console.log(channel)
        const cloneChannels = [...channels]
        cloneChannels.map((element) => {
            if (element.url === channel.url) {
                return channel
            }
            return element
        })
        setChannels(cloneChannels)
    }

    async function listenOnUserReceivedInvitation() {
        const {
            groupChannel,
            inviter,
            invitees,
        } = await onUserReceivedInvitation()
        console.log(groupChannel, inviter, invitees)
        setChannels((prevState) => [...prevState, groupChannel])
    }

    async function listenOnUserLeft() {
        const { groupChannel } = await onUserLeft()
        // console.log(groupChannel)

        let cloneChannels = [...channels]

        if (
            !groupChannel.members.some(
                (member) => member.userId === localStorage.getItem('userId')
            )
        ) {
            cloneChannels.filter((element) => element.url !== groupChannel.url)
            setChannel(null)
            setChannels((prevState) =>
                prevState.filter((element) => element.url !== groupChannel.url)
            )
        } else {
            cloneChannels.map((element) => {
                if (element.url === groupChannel.url) {
                    return groupChannel
                }
                return element
            })
            setChannels(cloneChannels)
        }
    }

    /**
     * NOTE: MyAutoComplete - Function
     */
    const onSearchMyAutoComplete = async (searchText) => {
        if (!!searchText) {
            let users = await userListQuery()
            // console.log(users)

            users = users
                .filter(
                    (user) => user.userId !== localStorage.getItem('userId')
                )
                .filter((user) => user.userId.includes(searchText))
                .map((user) => ({ ...user, value: user.userId }))
            // console.log(users)
            setOptions(users)
        } else {
            setOptions([])
        }
    }

    const onSelectMyAutoComplete = async (data) => {
        // console.log('onSelect', data)
        const response = await createChannelWithUserIds(
            [data],
            true,
            'personalChat'
        )
        console.log(response)
    }

    async function handleUploadFile(file) {
        try {
            const fileMessage = await sendFileMessage(
                channel,
                file,
                file.name,
                file.size,
                file.type
            )
            setMessages((prevState) => [...prevState, fileMessage])
            fileMessage && message.success('File updated successfully.')
        } catch (error) {
            message.error(error)
        }
    }

    function handleLogout() {
        setLoadingLogout(true)
        setTimeout(() => {
            disconnect()
            logoutFB()
            logout()

            setLoadingLogout(false)
        }, 1000)
    }

    const renderChannelList = (channels = []) => {
        return channels.map((channel) => renderChannel(channel))
    }

    const renderChannel = (channel) => {
        // console.log(channel)

        const isUnread = channel.unreadMessageCount > 0
        const isGroupChat = channel.joinedMemberCount <= 2

        const renderLastMessage = (lastMessage) => {
            // console.log(lastMessage)
            if (!lastMessage) {
                return ''
            }

            let text = lastMessage?.message

            const isAdmin = lastMessage?.messageType === 'admin'

            if (isAdmin) {
                return 'Admin: ' + text
            }

            const isAuthor =
                lastMessage?._sender?.userId === localStorage.getItem('userId')

            const isFile = lastMessage?.messageType === 'file'

            if (isFile) {
                text = 'sent an attachment'
            }

            if (isAuthor) {
                text = 'You: ' + lastMessage?.message

                if (isFile) {
                    text = 'You: sent an attachment'
                }
            } else {
                if (isGroupChat) {
                    text = `${lastMessage?._sender?.nickname}: ${lastMessage?.message}`

                    if (isFile) {
                        text = `${lastMessage?._sender?.nickname}: sent an attachment`
                    }
                }
            }

            return text
        }

        return (
            <Row
                style={{
                    height: 60,
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${THIRD_COLOR}`,
                    padding: '0 12px',
                    backgroundColor: isUnread && FOURTH_COLOR,
                    cursor: 'pointer',
                }}
                key={channel.url}
                onClick={() => {
                    setChannelUrl(channel.url)
                }}
            >
                <Col span={18}>
                    <Row>
                        <Col span={4}>
                            <Avatar src={channel.coverUrl} size="large">
                                {/* {channel.name} */}
                                {channel.members.find(
                                    (member) =>
                                        member.userId !==
                                        localStorage.getItem('userId')
                                ).nickname || ''}
                            </Avatar>
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Text
                                    style={{ margin: 0, padding: '0 10px' }}
                                    strong={isUnread}
                                    // level={5}
                                >
                                    {channel.members.find(
                                        (member) =>
                                            member.userId !==
                                            localStorage.getItem('userId')
                                    ).nickname || ''}
                                </Text>
                            </Row>
                            <Row>
                                <Text
                                    style={{ padding: '0 10px', fontSize: 12 }}
                                    type={!isUnread && 'secondary'}
                                    ellipsis={true}
                                    strong={isUnread}
                                >
                                    {renderLastMessage(channel.lastMessage)}
                                </Text>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    span={6}
                >
                    <Col
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                        xs={18}
                        sm={20}
                        md={20}
                        lg={20}
                        xl={20}
                    >
                        <Text strong={isUnread}>
                            {moment(channel.lastMessage?.createdAt).format(
                                'HH:mm a'
                            )}
                        </Text>
                    </Col>
                    <Col
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                        xs={6}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        {isUnread && <Badge color={PRIMARY_COLOR} />}
                    </Col>
                </Col>
            </Row>
        )
    }

    const renderListMessages = (messages = []) => {
        return messages.map((message) => renderMessage(message))
    }

    const renderMessage = (message) => {
        // message?.messageType === 'file' && console.log(message)
        message.isAdmin = message?.messageType === 'admin'
        message.isAuthor =
            message?._sender?.userId === localStorage.getItem('userId')
        message.status = message?.isAuthor && checkStatus()

        function checkStatus() {
            const unreadCount = channel.getReadReceipt(message)
            const undeliveredCount = channel.getUndeliveredMemberCount(message)
            // console.log( unreadCount, undeliveredCount)

            if (unreadCount === 0) {
                return 'seen'
            }
            if (undeliveredCount === 0) {
                return 'delivered'
            } else {
                return 'sent'
            }
        }

        return (
            <Row
                style={{
                    padding: '0 12px',
                    display: 'flex',
                    width: '100%',
                }}
                key={message.messageId}
            >
                <Row
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ margin: '16px 0' }}>
                        {moment(message.createdAt).format(
                            'HH:mm, DD MMM, YYYY'
                        )}
                    </div>
                </Row>

                {message.isAdmin ? (
                    <Row
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text type="secondary">{message.message}</Text>
                    </Row>
                ) : (
                    <Row
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: message.isAuthor
                                ? 'flex-end'
                                : 'flex-start',
                        }}
                    >
                        {renderMessageBubble(message)}
                    </Row>
                )}
            </Row>
        )
    }

    const renderMessageBubble = (message) => {
        // console.log(message)
        const renderLastMessageStatus = (status) => {
            if (status === 'sending') {
                return <LoadingOutlined />
            }

            if (status === 'sent') {
                return <Sent style={{ height: 14, width: 14 }} />
            }

            if (status === 'delivered') {
                return <Delivered style={{ height: 14, width: 14 }} />
            }

            if (status === 'seen') {
                return <Seen style={{ height: 14, width: 14 }} />
            }
        }

        return (
            <Tooltip
                placement={message.isAuthor ? 'topLeft' : 'topRight'}
                title={
                    <Emoticons
                        handleEmoji={(value) => handleEmoji(message.id, value)}
                    />
                }
                color="#fff"
                trigger={window.cordova ? 'click' : 'hover'}
                // onMouseEnter={() => console.log('onMouseEnter')}
                // onMouseLeave={() => console.log('onMouseLeave')}
                // onFocus={() => console.log('onFocus')}
            >
                <div>
                    <MessageBubble
                        w={300}
                        backgroundColor={
                            message.isAuthor ? PRIMARY_COLOR : THIRD_COLOR
                        }
                        color={message.isAuthor ? '#fff' : '#000'}
                        type={message.messageType}
                        url={message.url}
                        content={message.message}
                    />
                </div>
                {message.status && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 6,
                        }}
                    >
                        {renderLastMessageStatus(message.status)}
                    </div>
                )}
            </Tooltip>
        )
    }

    function handleEmoji(id, emoji) {
        console.log('handleEmoji --> id:', id, ', emoji:', emoji)
    }

    function handleShowDetail() {
        setShowDetail((prevState) => !prevState)
    }

    function handleEmojiMart(emoji) {
        setTypingText((prevState) => prevState + emoji.native)
    }

    async function handleLoadMore() {
        if (prevMessageListQuery) {
            prevMessageListQuery.load(function (messages, error) {
                if (error) {
                    return console.log(error)
                }

                // setMessages((prevState) => [...messages, ...prevState])
            })
        }
    }

    const renderMembers = (members = []) => {
        return members.map((member) => renderMember(member))
    }

    const renderMember = (member) => {
        const isOnline = member.connectionStatus === 'online'
        return (
            <div
                key={member.userId}
                style={{ display: 'flex', paddingBottom: 12 }}
            >
                <Badge dot color={isOnline ? ONLINE : OFFLINE}>
                    <Avatar
                        src={member.plainProfileUrl}
                        size="default"
                        shape="square"
                    >
                        {capitalizeFirstLetter(
                            firstCharacterOfEachString(member.userId)
                        )}
                    </Avatar>
                </Badge>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Title
                        style={{
                            margin: 0,
                            padding: '0 10px',
                            fontSize: 12,
                        }}
                        level={5}
                    >
                        {member.nickname}
                    </Title>
                    <Text
                        style={{
                            padding: '0 10px',
                            fontSize: 10,
                        }}
                        type="secondary"
                        ellipsis={true}
                    >
                        {`Last active: ${
                            isOnline
                                ? 'just now'
                                : moment(member.lastSeenAt).format('HH:mm A')
                        }`}
                    </Text>
                </div>
            </div>
        )
    }

    async function handleSendMessage(e) {
        if (e.keyCode === 13) {
            const newUserMessage = await sendUserMessage(channel, typingText)
            console.log(newUserMessage)
            setMessages((prevState) => [...prevState, newUserMessage])
            setTypingText('')
        }
    }

    async function handleLeaveChannel() {
        await leave(channel)
        handleRefresh()
    }

    function handleRefresh() {
        setChannelUrl(null)
        setChannel(null)
    }

    // async function handleInvite(userId) {
    //     const response = await inviteWithUserIds(channel, [userId])
    //     console.log(response)
    // }

    return (
        <Fragment>
            <Loading spinning={loadingLogout}>
                <Row
                    style={{
                        // borderTop: `1px solid ${THIRD_COLOR}`,
                        borderLeft: `1px solid ${THIRD_COLOR}`,
                        borderRight: `1px solid ${THIRD_COLOR}`,
                    }}
                >
                    <Col
                        style={{
                            borderRight: `1px solid ${THIRD_COLOR}`,
                        }}
                        xs={24}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <Channels
                            handleLogout={handleLogout}
                            handleRefresh={handleRefresh}
                            options={options}
                            onSelectMyAutoComplete={onSelectMyAutoComplete}
                            onSearchMyAutoComplete={onSearchMyAutoComplete}
                            loadingChannels={loadingChannels}
                            renderChannelList={renderChannelList}
                            channels={channels}
                        />
                    </Col>
                    {!channel ? (
                        <EmptyChannel />
                    ) : (
                        <Col xs={0} sm={18} md={18} lg={18} xl={18}>
                            <Row
                                style={{
                                    height: 60,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0 12px',
                                    borderBottom: `1px solid ${THIRD_COLOR}`,
                                }}
                            >
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            color: PRIMARY_COLOR,
                                            backgroundColor: SECONDARY_COLOR,
                                            marginRight: 12,
                                        }}
                                        src={channel?.coverUrl}
                                    >
                                        {channel.members.find(
                                            (member) =>
                                                member.userId !==
                                                localStorage.getItem('userId')
                                        ).nickname || ''}
                                    </Avatar>
                                    <Title style={{ margin: 0 }} level={4}>
                                        {channel.members.find(
                                            (member) =>
                                                member.userId !==
                                                localStorage.getItem('userId')
                                        ).nickname || ''}
                                    </Title>
                                </Col>
                                <Col>
                                    <Button
                                        style={{ border: 0 }}
                                        type="ghost"
                                        icon={
                                            <PhoneOutlined
                                                style={{ color: PRIMARY_COLOR }}
                                            />
                                        }
                                        size="large"
                                    />
                                    <Button
                                        style={{ border: 0 }}
                                        type="ghost"
                                        icon={
                                            <VideoCameraOutlined
                                                style={{ color: PRIMARY_COLOR }}
                                            />
                                        }
                                        size="large"
                                    />
                                    <Button
                                        style={{ border: 0 }}
                                        type="ghost"
                                        icon={
                                            <InfoCircleOutlined
                                                style={{
                                                    color:
                                                        showDetail &&
                                                        PRIMARY_COLOR,
                                                }}
                                            />
                                        }
                                        size="large"
                                        onClick={handleShowDetail}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col
                                    xs={0}
                                    sm={showDetail ? 16 : 24}
                                    md={showDetail ? 16 : 24}
                                    lg={showDetail ? 16 : 24}
                                    xl={showDetail ? 16 : 24}
                                >
                                    <div
                                        style={{
                                            height: 'calc(100vh - 120px)',
                                            borderBottom: `1px solid ${THIRD_COLOR}`,
                                            overflowY: 'auto',
                                            paddingBottom: 30,
                                        }}
                                        ref={scrollRef}
                                        onScroll={() => {
                                            // console.log(scrollRef.current)
                                            if (
                                                scrollRef.current.scrollTop ===
                                                0
                                            ) {
                                                console.log(
                                                    scrollRef.current.scrollTop
                                                )
                                                handleLoadMore()
                                            }
                                        }}
                                    >
                                        <MessageSkeleton
                                            loading={loadingListMessages}
                                            rows={13}
                                            size="default"
                                            avatar
                                        >
                                            <MemoizedScrollToBottom>
                                                {renderListMessages(messages)}
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
                                    <Row
                                        style={{
                                            height: 60,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottom: `1px solid ${THIRD_COLOR}`,
                                        }}
                                    >
                                        <Col
                                            style={{
                                                padding: 12,
                                                width: 'calc(100% - 120px)',
                                            }}
                                        >
                                            <Input
                                                placeholder="Type a message..."
                                                value={typingText}
                                                onChange={(e) =>
                                                    setTypingText(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={handleSendMessage}
                                                onFocus={() =>
                                                    channel?.startTyping()
                                                }
                                                onBlur={() =>
                                                    channel?.endTyping()
                                                }
                                            />
                                        </Col>
                                        <Col
                                            style={{
                                                float: 'right',
                                                display: 'flex',
                                            }}
                                        >
                                            <Upload
                                                beforeUpload={handleUploadFile}
                                                showUploadList={false}
                                            >
                                                <Button
                                                    style={{
                                                        border: 0,
                                                        display: 'inline-block',
                                                        cursor: 'pointer',
                                                    }}
                                                    type="ghost"
                                                    icon={<PictureOutlined />}
                                                    size="large"
                                                />
                                            </Upload>

                                            <Tooltip
                                                id="emoji-mart"
                                                placement="topRight"
                                                title={
                                                    <Picker
                                                        style={{
                                                            position:
                                                                'absolute',
                                                            bottom: 0,
                                                            right: 0,
                                                        }}
                                                        title="Pick your emoji…"
                                                        emoji="point_up"
                                                        size={20}
                                                        emojiSize={20}
                                                        color={PRIMARY_COLOR}
                                                        showPreview={false}
                                                        showSkinTones={false}
                                                        set="apple"
                                                        onSelect={
                                                            handleEmojiMart
                                                        }
                                                    />
                                                }
                                                color="transparent"
                                                style={{ color: 'blue' }}
                                                // trigger="click"
                                            >
                                                <Button
                                                    style={{ border: 0 }}
                                                    type="ghost"
                                                    icon={<SmileOutlined />}
                                                    size="large"
                                                />
                                            </Tooltip>
                                            <Button
                                                style={{ border: 0 }}
                                                type="ghost"
                                                icon={
                                                    <LikeOutlined
                                                        style={{
                                                            color: PRIMARY_COLOR,
                                                        }}
                                                    />
                                                }
                                                size="large"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {showDetail && (
                                    <Col
                                        style={{
                                            height: 'calc(100vh - 60px)',
                                            borderLeft: `1px solid ${THIRD_COLOR}`,
                                            borderBottom: `1px solid ${THIRD_COLOR}`,
                                        }}
                                        xs={0}
                                        sm={8}
                                        md={8}
                                        lg={8}
                                        xl={8}
                                    >
                                        <Row
                                            style={{
                                                height: 100,
                                                padding: '0 12px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar
                                                style={{
                                                    color: PRIMARY_COLOR,
                                                    backgroundColor: SECONDARY_COLOR,
                                                    marginRight: 12,
                                                }}
                                                size={64}
                                                src={channel?.coverUrl}
                                            >
                                                {channel.members.find(
                                                    (member) =>
                                                        member.userId !==
                                                        localStorage.getItem(
                                                            'userId'
                                                        )
                                                ).nickname || ''}
                                            </Avatar>
                                        </Row>
                                        <Row
                                            style={{
                                                height: 20,
                                                padding: '0 12px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Title
                                                style={{ margin: 0 }}
                                                level={3}
                                            >
                                                {channel.members.find(
                                                    (member) =>
                                                        member.userId !==
                                                        localStorage.getItem(
                                                            'userId'
                                                        )
                                                ).nickname || ''}
                                            </Title>
                                        </Row>
                                        <Divider />
                                        <Collapse
                                            defaultActiveKey={['0']}
                                            //   onChange={callback}
                                            //   expandIconPosition={expandIconPosition}
                                            ghost
                                            expandIconPosition="right"
                                        >
                                            <Panel
                                                header="Members"
                                                key={0}
                                                // showArrow={false}
                                            >
                                                {renderMembers(
                                                    channel?.members
                                                )}
                                            </Panel>
                                        </Collapse>
                                        <Divider />
                                        <Row>
                                            <Button
                                                onClick={handleLeaveChannel}
                                                danger
                                                type="link"
                                            >
                                                Leave Room
                                            </Button>
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    )}
                </Row>
            </Loading>
        </Fragment>
    )
}
