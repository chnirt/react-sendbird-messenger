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
import { useDashboard } from '@context'
import { getMembers } from '@mock'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'
import { Header, MemberItem } from './components'

const { Title } = Typography
const { Panel } = Collapse

export function Detail({ visible = false, onCancel = () => {} }) {
    const { t } = useTranslation()
    const { channel, setChannel } = useDashboard()

    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchMembers = async () => {
            const memberList = await getMembers()
            setMembers(memberList)
        }
        fetchMembers()
    }, [])

    const handleLeaveRoom = () => {
        setChannel(null)
        onCancel()
    }

    const url = channel?.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(channel?.name)
    )
    const name = channel?.name

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
