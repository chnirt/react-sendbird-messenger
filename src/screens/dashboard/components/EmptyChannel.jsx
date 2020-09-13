import React from 'react'
import { Col, Result, Button } from 'antd'

import { ReactComponent as Logo } from '@assets/images/logo/ic-main-sendbird-logo-white.svg'

export function EmptyChannel() {
    return (
        <Col
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            xs={0}
            sm={18}
            md={18}
            lg={18}
            xl={18}
        >
            <Result
                icon={<Logo />}
                title="Your Messages"
                subTitle="Send private photos and messages to a friend or group.
"
                extra={[
                    <Button type="primary" key="console">
                        Send Message
                    </Button>,
                ]}
            />
        </Col>
    )
}
