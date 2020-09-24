import React from 'react'
import { Avatar, Badge, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import {
    capitalizeFirstLetter,
    firstCharacterOfEachString,
    formatLastTime,
} from '@utils'
import { OFFLINE, ONLINE } from '@constants'

const { Title, Text } = Typography

export function MemberItem({ member }) {
    const { t } = useTranslation()

    const id = member.id
    const url = member.avatar
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(member.name)
    )
    const name = member.name
    const isOnline = member.connectionStatus
    const lastSeenAt = `${t('src.screens.dashboard.components.LA')}: ${
        isOnline
            ? t('src.screens.dashboard.components.JN')
            : formatLastTime(member.lastSeenAt)
    }`

    return (
        <div key={id} style={{ display: 'flex', paddingBottom: 12 }}>
            <Badge dot color={isOnline ? ONLINE : OFFLINE}>
                <Avatar src={url} size="default" shape="square">
                    {shortName}
                </Avatar>
            </Badge>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Title
                    style={{
                        margin: 0,
                        padding: '0 10px',
                        fontSize: 12,
                    }}
                    level={5}
                >
                    {name}
                </Title>
                <Text
                    style={{
                        padding: '0 10px',
                        fontSize: 10,
                    }}
                    type="secondary"
                    ellipsis={true}
                >
                    {lastSeenAt}
                </Text>
            </div>
        </div>
    )
}
