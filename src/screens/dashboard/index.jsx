import React, { useLayoutEffect, useState, Fragment } from 'react'
import {
    Row,
    Col,
    Button,
    Avatar,
    Typography,
    Dropdown,
    Upload,
    Divider,
    Tooltip,
    Badge,
    Input,
} from 'antd'
import {
    SettingOutlined,
    FormOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    InfoCircleOutlined,
    PictureOutlined,
    SmileOutlined,
    LikeOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import { Picker } from 'emoji-mart'

import {
    Loading,
    MyAutoComplete,
    Emoticons,
    MessageBubble,
    MySkeleton,
    MessageSkeleton,
    MemoizedScrollToBottom,
} from '../../components'
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    THIRD_COLOR,
    FOURTH_COLOR,
    ONLINE,
    OFFLINE,
} from '../../constants'
import { useAuth, useFirebase, useSendBird } from '../../context'
import { MyMenu } from './components'
import { firstCharacterOfEachString, capitalizeFirstLetter } from '../../utils'
import { useRef } from 'react'

const { Title, Text } = Typography

export default function Dashboard() {
    const { logout } = useAuth()
    const { logoutFB, authRef, getUsers } = useFirebase()
    const {
        disconnect,
        channelListQuery,
        getChannel,
        createPreviousMessageListQuery,
        sendUserMessage,
    } = useSendBird()

    const [loadingLogout, setLoadingLogout] = useState(false)
    const [showDetail, setShowDetail] = useState(true)

    const [channels, setChannels] = useState([])
    const [loadingChannels, setLoadingChannels] = useState(false)

    const [channel, setChannel] = useState({})

    const [message, setMessage] = useState('')

    const [messages, setMessages] = useState([])
    const [loadingListMessages, setLoadingListMessages] = useState(false)

    const [channelUrl, setChannelUrl] = useState(null)

    const [prevMessageListQuery, setPrevMessageListQuery] = useState(null)

    const [fileList] = useState([])

    const scrollRef = useRef()

    /**
     * MyAutoComplete - State
     */
    const [options, setOptions] = useState([])

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
            // channels.map((channel) => {
            //   // console.log(channel.url);
            //   return markAsDelivered(channel.url);
            // });
            setChannels(channels)
            setLoadingChannels(false)
        }
    }, [channelListQuery])

    /**
     * SendBird - fetchChannel - Effect
     */
    useLayoutEffect(() => {
        async function fetchChannel(url) {
            const channel = await getChannel(url)
            setChannel(channel)

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

                    setMessages(messages)
                    setLoadingListMessages(false)
                })
            }
        }

        if (channelUrl) {
            fetchChannel(channelUrl)

            // if (channel.channelType === 'group') {
            //     channel.markAsRead()
            // }
        }
    }, [getChannel, channelUrl, createPreviousMessageListQuery])

    /**
     * NOTE: MyAutoComplete - Function
     */
    const onSearchMyAutoComplete = async (searchText) => {
        if (!!searchText) {
            const snapshot = await getUsers({ email: searchText })
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }

            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data())
            })
            setOptions(snapshot.docs.map((doc) => ({ ...doc, value: doc.id })))
        } else {
            setOptions([])
        }
    }

    const onSelectMyAutoComplete = (data) => {
        console.log('onSelect', data)
    }

    const props = {
        onRemove: (file) => {
            // this.setState((state) => {
            // 	const index = state.fileList.indexOf(file)
            // 	const newFileList = state.fileList.slice()
            // 	newFileList.splice(index, 1)
            // 	return {
            // 		fileList: newFileList,
            // 	}
            // })
        },
        beforeUpload: (file) => {
            // this.setState((state) => ({
            // 	fileList: [...state.fileList, file],
            // }))
            return false
        },
        fileList,
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
                                {channel.name}
                            </Avatar>
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Title
                                    style={{ margin: 0, padding: '0 10px' }}
                                    level={5}
                                >
                                    {channel.name}
                                </Title>
                            </Row>
                            <Row>
                                <Text
                                    style={{ padding: '0 10px' }}
                                    type="secondary"
                                    ellipsis={true}
                                >
                                    {channel.lastMessage?.message}
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
                        {moment(channel.createdAt).format('HH:mm a')}
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
        message.isAuthor =
            message._sender.userId === localStorage.getItem('userId')

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
            </Row>
        )
    }

    const renderMessageBubble = (message) => {
        return (
            <Tooltip
                placement="topLeft"
                title={
                    <Emoticons
                        handleEmoji={(value) => handleEmoji(message.id, value)}
                    />
                }
                color="#fff"
            >
                <div>
                    <MessageBubble
                        w={300}
                        backgroundColor={
                            message.isAuthor ? PRIMARY_COLOR : THIRD_COLOR
                        }
                        color={message.isAuthor ? '#fff' : '#000'}
                        content={message.message}
                    />
                </div>
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
        setMessage((prevState) => prevState + emoji.native)
    }

    async function handleLoadMore() {
        prevMessageListQuery.load(function (messages, error) {
            if (error) {
                return console.log(error)
            }

            setMessages((prevState) => [...messages, ...prevState])
        })
    }

    const renderMembers = (members = []) => {
        return members.map((member) => renderMember(member))
    }

    const renderMember = (member) => {
        const isOnline = member.connectionStatus === 'online'
        return (
            <div style={{ display: 'flex', paddingBottom: 12 }}>
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
                        {member.userId}
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
                                : moment(member.lastSeenAt).format('HH:mm AA')
                        }`}
                    </Text>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <Loading spinning={loadingLogout}>
                <Row
                    style={{
                        borderTop: `1px solid ${THIRD_COLOR}`,
                        borderLeft: `1px solid ${THIRD_COLOR}`,
                        borderRight: `1px solid ${THIRD_COLOR}`,
                    }}
                >
                    <Col
                        style={{ borderRight: `1px solid ${THIRD_COLOR}` }}
                        xs={24}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6}
                    >
                        <Row
                            style={{
                                height: 60,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: `1px solid ${THIRD_COLOR}`,
                                padding: '0 12px',
                            }}
                        >
                            <Col>
                                <Dropdown
                                    overlay={() =>
                                        MyMenu({ logout: handleLogout })
                                    }
                                    placement="bottomLeft"
                                    trigger={['click']}
                                >
                                    <Button
                                        style={{ border: 0 }}
                                        type="ghost"
                                        icon={
                                            <SettingOutlined
                                                style={{ color: PRIMARY_COLOR }}
                                            />
                                        }
                                        size="large"
                                    />
                                </Dropdown>
                            </Col>
                            <Col>SendBird Messenger</Col>
                            <Col>
                                <Button
                                    style={{ border: 0 }}
                                    type="ghost"
                                    icon={
                                        <FormOutlined
                                            style={{ color: PRIMARY_COLOR }}
                                        />
                                    }
                                    size="large"
                                />
                            </Col>
                        </Row>
                        <Row
                            style={{
                                height: 60,
                                borderBottom: `1px solid ${THIRD_COLOR}`,
                                padding: 12,
                            }}
                        >
                            <MyAutoComplete
                                style={{ width: '100%' }}
                                options={options}
                                onSelect={onSelectMyAutoComplete}
                                onSearch={onSearchMyAutoComplete}
                            />
                        </Row>

                        <div
                            style={{
                                height: 'calc(100vh - 120px)',
                                overflowY: 'auto',
                                borderBottom: `1px solid ${THIRD_COLOR}`,
                                paddingBottom: 12,
                            }}
                        >
                            <MySkeleton
                                loading={loadingChannels}
                                rows={13}
                                size="default"
                                avatar
                            >
                                {renderChannelList(channels)}
                            </MySkeleton>
                        </div>
                    </Col>
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
                                    src={channel.coverUrl}
                                >
                                    {channel.name}
                                </Avatar>
                                <Title style={{ margin: 0 }} level={4}>
                                    {channel.name}
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
                                                    showDetail && PRIMARY_COLOR,
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
                                        paddingBottom: 12,
                                    }}
                                    ref={scrollRef}
                                    onScroll={() => {
                                        console.log(scrollRef.current)
                                        if (scrollRef.current.scrollTop === 0) {
                                            // console.log(
                                            //     scrollRef.current.scrollTop
                                            // )
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
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            onKeyDown={async (e) => {
                                                if (e.keyCode === 13) {
                                                    const newMessage = await sendUserMessage(
                                                        channel,
                                                        message
                                                    )
                                                    setMessages((prevState) => [
                                                        ...prevState,
                                                        newMessage,
                                                    ])
                                                    setMessage('')
                                                }
                                            }}
                                            onFocus={() =>
                                                channel.startTyping()
                                            }
                                            onBlur={() => channel.endTyping()}
                                        />
                                    </Col>
                                    <Col
                                        style={{
                                            float: 'right',
                                            display: 'flex',
                                        }}
                                    >
                                        <Upload {...props}>
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
                                                        position: 'absolute',
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
                                                    onSelect={handleEmojiMart}
                                                />
                                            }
                                            color="transparent"
                                            style={{ color: 'blue' }}
                                            trigger="click"
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
                                            src={channel.coverUrl}
                                        >
                                            {channel.name}
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
                                        <Title style={{ margin: 0 }} level={3}>
                                            {channel.name}
                                        </Title>
                                    </Row>
                                    <Divider />
                                    <Row
                                        style={{
                                            height: 20,
                                            padding: '0 12px',
                                        }}
                                    >
                                        <Col>
                                            <Title level={5}>Members</Title>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{
                                            padding: 12,
                                        }}
                                    >
                                        {renderMembers(channel?.members)}
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Loading>
        </Fragment>
    )
}
