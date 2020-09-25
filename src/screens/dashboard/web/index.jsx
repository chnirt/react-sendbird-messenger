import React, { Fragment } from 'react'
import { Col, Row } from 'antd'

import { THIRD_COLOR } from '@constants'
import { useDashboard } from '@context'
import { Channels, Channel, EmptyChannel } from './components'

export default function Web({ handleLogout = () => {} }) {
    const { channel } = useDashboard()

    return (
        <Fragment>
            <Row
                style={{
                    border: `1px solid ${THIRD_COLOR}`,
                }}
            >
                <Col
                    style={{
                        borderRight: `1px solid ${THIRD_COLOR}`,
                    }}
                    xs={24}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                >
                    <Channels handleLogout={handleLogout} />
                </Col>
                <Col xs={0} sm={18} md={18} lg={18} xl={18}>
                    {channel ? <Channel /> : <EmptyChannel />}
                </Col>
            </Row>
        </Fragment>
    )
}
