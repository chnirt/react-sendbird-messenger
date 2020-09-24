import React from 'react'
import { Button, Drawer, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import Accept from '@assets/images/incomingcall/accept.png'
import Decline from '@assets/images/incomingcall/decline.png'
import Avatar from 'antd/lib/avatar/avatar'
import { DEFAULT_IMG } from '@constants'

const { Title, Text } = Typography

export function IncomingCall({
    showIncomingCall = false,
    setShowIncomingCall = () => {},
    onOk = () => {},
}) {
    const { t } = useTranslation()

    const handleCloseIncomingCall = () => setShowIncomingCall(false)

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
            visible={showIncomingCall}
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
                        }}
                        icon={
                            <img
                                style={{ height: 100 }}
                                src={Accept}
                                alt="accept"
                            />
                        }
                        type="ghost"
                        size="large"
                        onClick={onOk}
                    />
                    <Button
                        style={{
                            border: 0,
                            justifyContent: 'center',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        icon={
                            <img
                                style={{ height: 100 }}
                                src={Decline}
                                alt="decline"
                            />
                        }
                        type="ghost"
                        size="large"
                        onClick={handleCloseIncomingCall}
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
            />
            <Title style={{ margin: '10px 0 0' }} level={3}>
                Maria
            </Title>
            <Text>@maria</Text>
        </Drawer>
    )
}
