import React, { Fragment, useLayoutEffect, useState } from 'react'
import { Button, Col, Row, Typography, Avatar } from 'antd'
import {
    PhoneOutlined,
    VideoCameraOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'

import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '@constants'
import { IncomingCallModal } from '@components'
import { useDashboard, useSendBird } from '@context'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'
import { channelDto } from '@dto'

const { Title } = Typography

export function Header({ detailVisible = false, toggleShowDetail = () => {} }) {
    const {
        channel,
        setShowVideoCall,
        directCall,
        setDirectCall,
        setMediaAccess,
    } = useDashboard()
    const {
        requireMediaAccess,
        dial,
        accept,
        onRinging,
        onAudioInputDeviceChanged,
        onAudioOutputDeviceChanged,
        onVideoInputDeviceChanged,
        dispose,
    } = useSendBird()

    const [showIncomingCall, setShowIncomingCall] = useState(false)

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

    useLayoutEffect(() => {
        listenOnRinging()
        listenOnAudioInputDeviceChanged()
        listenOnAudioOutputDeviceChanged()
        listenOnVideoInputDeviceChanged()
    })

    const handleAudioCall = async () => {
        setShowVideoCall(true)
        setShowIncomingCall(false)

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

    const handleVideoCall = () => {
        setShowIncomingCall((prevState) => !prevState)
    }

    const handleOk = () => {
        // console.log(directCall)

        setShowVideoCall(true)
        setShowIncomingCall(false)

        setTimeout(async () => {
            accept(directCall)
        }, 500)
    }

    const handleCancel = () => {
        directCall.end()
        setDirectCall(null)
        setShowIncomingCall(false)
    }

    const formatChannel = channelDto(channel)

    const url = formatChannel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(formatChannel.name)
    )
    const name = formatChannel.name

    return (
        <Fragment>
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
                        src={url}
                    >
                        {shortName}
                    </Avatar>
                    <Title style={{ margin: 0 }} level={4}>
                        {name}
                    </Title>
                </Col>
                <Col>
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={
                            <PhoneOutlined style={{ color: PRIMARY_COLOR }} />
                        }
                        size="large"
                        onClick={handleAudioCall}
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
                        onClick={handleVideoCall}
                    />
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={
                            <InfoCircleOutlined
                                style={{
                                    color: detailVisible && PRIMARY_COLOR,
                                }}
                            />
                        }
                        size="large"
                        onClick={toggleShowDetail}
                    />
                </Col>
            </Row>

            <IncomingCallModal
                caller={directCall?.caller}
                visible={showIncomingCall}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </Fragment>
    )
}
