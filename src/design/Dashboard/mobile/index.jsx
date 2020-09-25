import React, { Fragment, useState } from 'react'
import { Col, Row } from 'antd'

import { THIRD_COLOR } from '@constants'
import { useDashboard } from '@context'
import { Channels, Chat } from './components'

export default function Mobile({ handleLogout = () => {} }) {
    const { setChannel } = useDashboard()

    const [showChannel, setShowChannel] = useState(false)

    const handleShowChannel = () => setShowChannel(true)

    const handleCloseChannel = () => {
        setShowChannel(false)
        setTimeout(() => {
            setChannel(null)
        }, 500)
    }

    return (
        <Fragment>
            <Row
                style={{
                    border: `1px solid ${THIRD_COLOR}`,
                }}
            >
                <Col span={24}>
                    <Channels
                        handleLogout={handleLogout}
                        handleShowChannel={handleShowChannel}
                    />
                </Col>

                <Chat
                    visible={showChannel}
                    handleCloseChannel={handleCloseChannel}
                />
            </Row>
        </Fragment>
    )
}
