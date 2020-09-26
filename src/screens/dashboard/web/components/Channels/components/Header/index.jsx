import React, { Fragment, useState } from 'react'
import { Row, Col, Button } from 'antd'
import { SettingOutlined, FormOutlined } from '@ant-design/icons'

import { PRIMARY_COLOR, THIRD_COLOR } from '@constants'
import { useDashboard } from '@context'
import { ScaleIn } from '@animations'
import { MyMenu } from './components'

export function Header({ handleLogout = () => {} }) {
    const { setChannel } = useDashboard()

    const [showMenu, setShowMenu] = useState(false)

    const navigateDashboard = () => {
        setChannel(null)
    }

    const handleShowMenu = () => setShowMenu(true)

    const handleCloseMenu = () => setShowMenu(false)

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
                    <ScaleIn>
                        <Button
                            style={{ border: 0 }}
                            type="ghost"
                            icon={
                                <SettingOutlined
                                    style={{ color: PRIMARY_COLOR }}
                                />
                            }
                            size="large"
                            onClick={handleShowMenu}
                        />
                    </ScaleIn>
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'center' }}
                    span={18}
                >
                    <Button onClick={navigateDashboard} type="link">
                        SendBird Messenger
                    </Button>
                </Col>
                <Col
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    span={3}
                >
                    <ScaleIn>
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
                    </ScaleIn>
                </Col>
            </Row>

            <MyMenu
                visible={showMenu}
                onClose={handleCloseMenu}
                handleLogout={handleLogout}
            />
        </Fragment>
    )
}
