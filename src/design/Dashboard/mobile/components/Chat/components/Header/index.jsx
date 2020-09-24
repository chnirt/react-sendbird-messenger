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

export function Header({
    showDetail = false,
    setShowDetail = () => {},
    setShowIncomingCall = () => {},
}) {
    const { channel, setChannel } = useDashboard()

    const handleCloseChannel = () => setChannel(null)

    const handleShowDetail = () => setShowDetail(true)

    const handleShowIncomingCall = () => setShowIncomingCall(true)

    const name = channel?.name

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
                    onClick={handleCloseChannel}
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
                    onClick={handleShowIncomingCall}
                />
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={
                        <VideoCameraOutlined style={{ color: PRIMARY_COLOR }} />
                    }
                    size="large"
                    onClick={handleShowIncomingCall}
                />
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={
                        <InfoCircleOutlined
                            style={{
                                color: showDetail && PRIMARY_COLOR,
                            }}
                        />
                    }
                    size="large"
                    onClick={handleShowDetail}
                />
            </Col>
        </Row>
    )
}
