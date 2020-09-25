import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Button, Col, Collapse, Divider, Row, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { PRIMARY_COLOR, SECONDARY_COLOR, THIRD_COLOR } from '@constants'
import { useDashboard, useSendBird } from '@context'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'
// import { getMembers } from '@mock'
import { channelDto, memberDto } from '@dto'
import { MemberItem } from './components'

const { Title } = Typography
const { Panel } = Collapse

export function Detail() {
    const { t } = useTranslation()
    const { channel, setChannel, setChannels } = useDashboard()
    const { leave } = useSendBird()

    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            // const memberList = await getMembers()
            const memberList = channel.members
            const membersDto = memberList.map((element) => memberDto(element))

            setMembers(membersDto)
        }
        fetchMembers()
    }, [channel])

    const handleLeaveRoom = async () => {
        // console.log(channel)
        const response = await leave(channel)
        // console.log(response)

        if (response) {
            setChannel(null)
            setChannels((prevState) =>
                prevState.filter((element) => element.id !== channel.url)
            )
        }
    }

    const formatChannel = channelDto(channel)

    const url = formatChannel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(formatChannel.name)
    )
    const name = formatChannel.name

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
                        header={t('src.screens.dashboard.components.M')}
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
