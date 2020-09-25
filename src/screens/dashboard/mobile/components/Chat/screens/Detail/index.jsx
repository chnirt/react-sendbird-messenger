import React, { useEffect, useState } from 'react'
import {
    Drawer,
    Row,
    Avatar,
    Typography,
    Divider,
    Collapse,
    Button,
} from 'antd'
import { useTranslation } from 'react-i18next'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@constants'
import { useDashboard, useSendBird } from '@context'
// import { getMembers } from '@mock'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'
import { channelDto, memberDto } from '@dto'
import { Header, MemberItem } from './components'

const { Title } = Typography
const { Panel } = Collapse

export function Detail({ visible = false, onCancel = () => {} }) {
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
            onCancel()
        }
    }

    const formatChannel = channelDto(channel)

    const url = formatChannel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(formatChannel.name)
    )
    const name = formatChannel.name

    return (
        <Drawer
            headerStyle={{
                height: 60,
                padding: 0,
            }}
            title={<Header onCancel={onCancel} />}
            width="100%"
            closable={false}
            visible={visible}
            bodyStyle={{ padding: 0 }}
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
        </Drawer>
    )
}
