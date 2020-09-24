import React, { Fragment } from 'react'
import { Col, Row } from 'antd'

import { Loading } from '@components'
import { THIRD_COLOR } from '@constants'
import { Channels, Chat } from './components'

export default function Mobile() {
    return (
        <Fragment>
            <Loading spinning={false}>
                <Row
                    style={{
                        border: `1px solid ${THIRD_COLOR}`,
                    }}
                >
                    <Col>
                        <Channels />
                    </Col>

                    <Chat />
                </Row>
            </Loading>
        </Fragment>
    )
}
