import React from 'react'
import { Button, Drawer, Typography, Avatar } from 'antd'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Phone } from '@assets/svg/call/call-phone-white.svg'
import { ReactComponent as Decline } from '@assets/svg/call/call-decline-white.svg'

import { DEFAULT_IMG, ACCEPT, REJECT } from '@constants'

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
                        onClick={handleCloseIncomingCall}
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
            />
            <Title style={{ margin: '10px 0 0' }} level={3}>
                Maria
            </Title>
            <Text>@maria</Text>
        </Drawer>
    )
}
