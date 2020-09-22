import React, { Fragment, useState } from 'react'
import { Button, Col, Row, Typography, Avatar } from 'antd'
import {
    PhoneOutlined,
    VideoCameraOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'

import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '@constants'
import { IncomingCallModal } from '@components'
import { useDashboard } from '@context'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'

const { Title } = Typography

export function Header({ detailVisible = false, toggleShowDetail = () => {} }) {
    const { channel } = useDashboard()

    const [showIncomingCall, setShowIncomingCall] = useState(false)

    const handleAudioCall = () => {
        setShowIncomingCall((prevState) => !prevState)
    }

    const handleVideoCall = () => {
        setShowIncomingCall((prevState) => !prevState)
    }

    const handleOk = () => {}

    const handleCancel = () => {
        setShowIncomingCall(false)
    }

    const url = channel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(channel.name)
    )
    const name = channel.name

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
                visible={showIncomingCall}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </Fragment>
    )
}
