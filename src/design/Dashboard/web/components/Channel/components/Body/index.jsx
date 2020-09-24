import React, { Fragment } from 'react'
import { Row } from 'antd'

import { Chat, Detail } from './components'

export function Body({ detailVisible = false }) {
    return (
        <Fragment>
            <Row>
                <Chat detailVisible={detailVisible} />
                {detailVisible && <Detail />}
            </Row>
        </Fragment>
    )
}
