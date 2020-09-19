import React, { Fragment } from 'react'
import { Col, Row } from 'antd'

import { Messages, ChatInput, Typing } from './components'

export function Chat({ detailVisible = false }) {
    return (
        <Fragment>
            <Col
                xs={0}
                sm={detailVisible ? 16 : 24}
                md={detailVisible ? 16 : 24}
                lg={detailVisible ? 16 : 24}
                xl={detailVisible ? 16 : 24}
            >
                <Messages />

                <Typing />

                <Row
                    style={{
                        height: 60,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <ChatInput />
                </Row>
            </Col>
        </Fragment>
    )
}
