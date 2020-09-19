import React, { Fragment } from 'react'
import { Button, Col, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import background from '@assets/images/404/undraw_not_found_60pq.png'

const { Title, Paragraph } = Typography

export default function NotFound() {
    const navigate = useNavigate()
    const { t } = useTranslation()

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
                    {t('src.screens.notfound.STPYVDNE')}
                </Paragraph>
                <Button onClick={navigateHome} type="primary">
                    {t('src.screens.notfound.BH')}
                </Button>
            </Col>
        </Fragment>
    )
}
