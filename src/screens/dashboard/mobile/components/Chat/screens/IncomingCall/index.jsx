import React from 'react'
import { Button, Drawer, Typography, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Phone } from '@assets/svg/call/call-phone-white.svg'
import { ReactComponent as Decline } from '@assets/svg/call/call-decline-white.svg'

import { DEFAULT_IMG, ACCEPT, REJECT } from '@constants'
import { capitalizeFirstLetter, firstCharacterOfEachString } from '@utils'

const { Title, Text } = Typography

export function IncomingCall({
    visible = false,
    onCancel = () => {},
    onOk = () => {},
    caller = {},
}) {
    const { t } = useTranslation()

    const id = caller.userId
    const shortName = capitalizeFirstLetter(
        firstCharacterOfEachString(caller.nickname)
    )
    const name = caller.nickname

    return (
        <Drawer
            title={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {t('src.components.IC')}
                </div>
            }
            placement="bottom"
            closable={false}
            visible={visible}
            height="100%"
            footer={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '12px 0',
                    }}
                >
                    <Button
                        style={{
                            border: 0,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: REJECT,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                        }}
                        icon={
                            <Decline
                                style={{ position: 'absolute', height: 25 }}
                            />
                        }
                        type="ghost"
                        onClick={onCancel}
                    />
                    <Button
                        style={{
                            border: 0,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: ACCEPT,
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                        }}
                        icon={
                            <Phone
                                style={{ position: 'absolute', height: 25 }}
                            />
                        }
                        type="ghost"
                        onClick={onOk}
                    />
                </div>
            }
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar
                className="pulse"
                shape="circle"
                size={128}
                src={DEFAULT_IMG}
            >
                {shortName}
            </Avatar>
            <Title style={{ margin: '10px 0 0' }} level={3}>
                {name}
            </Title>
            <Text>{id}</Text>
        </Drawer>
    )
}
