import React, { Fragment } from 'react'
import { Button, Col, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import background from '../../assets/undraw_not_found_60pq.png'

const { Title, Paragraph } = Typography

export default function NotFound() {
    const navigate = useNavigate()

    function navigateHome() {
        navigate('/')
    }
    return (
        <Fragment>
            <Col
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100vh',
                    justifyContent: 'center',
                }}
            >
                <img src={background} alt="Background" width="20%" />
                <Title level={3}>404</Title>
                <Paragraph type="secondary">
                    Sorry, the page you visited does not exist.
                </Paragraph>
                <Button onClick={navigateHome} type="primary">
                    Back Home
                </Button>
            </Col>
        </Fragment>
    )
}
