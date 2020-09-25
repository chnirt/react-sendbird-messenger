import React, { Fragment } from 'react'
import { Col, Row } from 'antd'

import { THIRD_COLOR } from '@constants'
import { Channels, Chat } from './components'

export default function Mobile({ handleLogout = () => {} }) {
    return (
        <Fragment>
            <Row
                style={{
                    border: `1px solid ${THIRD_COLOR}`,
                }}
            >
                <Col span={24}>
                    <Channels handleLogout={handleLogout} />
                </Col>

                <Chat />
            </Row>
        </Fragment>
    )
}
