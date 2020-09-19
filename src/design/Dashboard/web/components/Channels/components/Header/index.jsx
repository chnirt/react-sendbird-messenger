import React, { Fragment, useState } from 'react'
import { Row, Col, Button } from 'antd'
import { SettingOutlined, FormOutlined } from '@ant-design/icons'

import { PRIMARY_COLOR, THIRD_COLOR } from '@constants'
import { MyMenu } from './components'

export function Header() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <Fragment>
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
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                    span={3}
                >
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={
                            <SettingOutlined style={{ color: PRIMARY_COLOR }} />
                        }
                        size="large"
                        onClick={() => setShowMenu(true)}
                    />
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'center' }}
                    span={18}
                >
                    <Button onClick={() => {}} type="link">
                        SendBird Messenger
                    </Button>
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    span={3}
                >
                    <Button
                        style={{ border: 0 }}
                        type="ghost"
                        icon={<FormOutlined style={{ color: PRIMARY_COLOR }} />}
                        size="large"
                    />
                </Col>
            </Row>

            <MyMenu visible={showMenu} onClose={() => setShowMenu(false)} />
        </Fragment>
    )
}
