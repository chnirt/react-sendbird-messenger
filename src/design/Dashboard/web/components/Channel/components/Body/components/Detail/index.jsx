import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Button, Col, Collapse, Divider, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '@constants'
import { useDashboard } from '@context'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'
import { getMembers } from '@mock'
import { MemberItem } from './components'

const { Title } = Typography
const { Panel } = Collapse

export function Detail() {
    const { t } = useTranslation()
    const { channel } = useDashboard()

    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            const memberList = await getMembers()
            setMembers(memberList)
        }
        fetchMembers()
    }, [])

    const handleLeaveRoom = () => {}

    const url = channel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(channel.name)
    )
    const name = channel.name

    return (
        <Fragment>
            <Col
                style={{
                    height: 'calc(100vh - 62px)',
                    borderLeft: `1px solid ${THIRD_COLOR}`,
                }}
                xs={0}
                sm={8}
                md={8}
                lg={8}
                xl={8}
            >
                <Row
                    style={{
                        height: 100,
                        padding: '0 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        style={{
                            color: PRIMARY_COLOR,
                            backgroundColor: SECONDARY_COLOR,
                            marginRight: 12,
                        }}
                        size={64}
                        src={url}
                    >
                        {shortName}
                    </Avatar>
                </Row>
                <Row
                    style={{
                        height: 20,
                        padding: '0 12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Title style={{ margin: 0 }} level={3}>
                        {name}
                    </Title>
                </Row>
                <Divider />
                <Collapse
                    defaultActiveKey={['0']}
                    //   onChange={callback}
                    //   expandIconPosition={expandIconPosition}
                    ghost
                    expandIconPosition="right"
                >
                    <Panel
                        header="Members"
                        key={0}
                        // showArrow={false}
                    >
                        {members.map((member) => (
                            <MemberItem member={member} />
                        ))}
                    </Panel>
                </Collapse>
                <Divider />
                <Row>
                    <Button onClick={handleLeaveRoom} danger type="link">
                        {t('src.screens.dashboard.components.LR')}
                    </Button>
                </Row>
            </Col>
        </Fragment>
    )
}
