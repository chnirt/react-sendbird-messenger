import React from 'react'
import { Col, Row, Avatar, Typography, Badge } from 'antd'

import { PRIMARY_COLOR, THIRD_COLOR, FOURTH_COLOR } from '@constants'
import {
    capitalizeFirstLetter,
    firstCharacterOfEachString,
    formatLastTime,
} from '@utils'
import { useDashboard } from '@context'

const { Text } = Typography

export function ChannelItem({ channel }) {
    const { setChannel } = useDashboard()

    const handleClickChannel = () => {
        setChannel(channel)
    }

    const isUnread = channel.isUnread
    const url = channel.url
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(channel.name)
    )
    const name = channel.name
    const lastMessage = channel.lastMessage
    const createdAt = formatLastTime(channel.createdAt)

    return (
        <Row
            style={{
                height: 60,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${THIRD_COLOR}`,
                padding: '0 12px',
                backgroundColor: isUnread && FOURTH_COLOR,
                cursor: 'pointer',
            }}
            key={url}
            onClick={handleClickChannel}
        >
            <Col xs={3} sm={3} md={3} lg={4} xl={3}>
                <Avatar style={{ marginRight: 12 }} src={url} size="large">
                    {shortName}
                </Avatar>
            </Col>
            <Col xs={14} sm={14} md={14} lg={12} xl={14}>
                <Row>
                    <Text
                        style={{ margin: 0, padding: '0 10px' }}
                        strong={isUnread}
                        ellipsis={true}
                        // level={5}
                    >
                        {name}
                    </Text>
                </Row>
                <Row>
                    <Text
                        style={{ padding: '0 10px', fontSize: 12 }}
                        type={!isUnread && 'secondary'}
                        ellipsis={true}
                        strong={isUnread}
                    >
                        {lastMessage}
                    </Text>
                </Row>
            </Col>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
                xs={7}
                sm={7}
                md={7}
                lg={8}
                xl={7}
            >
                <Text strong={isUnread}>{createdAt}</Text>
                {isUnread && (
                    <Badge style={{ marginLeft: 12 }} color={PRIMARY_COLOR} />
                )}
            </Col>
        </Row>
    )
}
