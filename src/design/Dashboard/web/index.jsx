import React, { Fragment } from 'react'
import { Col, Row } from 'antd'

import { Loading } from '@components'
import { THIRD_COLOR } from '@constants'

import { Channels, Channel } from './components'

export default function Web() {
    return (
        <Fragment>
            <Loading spinning={false}>
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
                        Dashboard <Channels /> <Channel />
                    </Col>
                </Row>
            </Loading>
        </Fragment>
    )
}
