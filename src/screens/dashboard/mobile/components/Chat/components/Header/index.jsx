import React from 'react'
import { Button, Col, Row } from 'antd'
import {
    PhoneOutlined,
    VideoCameraOutlined,
    InfoCircleOutlined,
    LeftOutlined,
} from '@ant-design/icons'

import { PRIMARY_COLOR } from '@constants'
import { useDashboard } from '@context'
import { channelDto } from '@dto'

export function Header({
    visible = false,
    onCancel = () => {},
    showDetail = () => {},
    handleAudioCall = () => {},
    handleVideoCall = () => {},
}) {
    const { channel } = useDashboard()

    const formatChannel = channelDto(channel)

    const name = formatChannel.name

    return (
        <Row
            style={{
                height: 60,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 12px',
            }}
        >
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
                span={3}
            >
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={<LeftOutlined style={{ color: PRIMARY_COLOR }} />}
                    size="large"
                    onClick={onCancel}
                />
            </Col>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
                span={12}
            >
                {name}
            </Col>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                span={9}
            >
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={<PhoneOutlined style={{ color: PRIMARY_COLOR }} />}
                    size="large"
                    onClick={handleAudioCall}
                />
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={
                        <VideoCameraOutlined style={{ color: PRIMARY_COLOR }} />
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
                                color: visible && PRIMARY_COLOR,
                            }}
                        />
                    }
                    size="large"
                    onClick={showDetail}
                />
            </Col>
        </Row>
    )
}
