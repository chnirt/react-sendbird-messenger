import React from 'react'
import { Button, Col, Row } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import { PRIMARY_COLOR } from '@constants'

export function Header({ onCancel = () => {} }) {
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
            >
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={<LeftOutlined style={{ color: PRIMARY_COLOR }} />}
                    size="large"
                    onClick={onCancel}
                />
            </Col>
        </Row>
    )
}
