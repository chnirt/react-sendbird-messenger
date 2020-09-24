import React from 'react'
import { Button, Modal, Avatar, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { DEFAULT_IMG } from '@constants'
import Accept from '@assets/images/incomingcall/accept.png'
import Decline from '@assets/images/incomingcall/decline.png'

const { Title, Text } = Typography

export function IncomingCallModal({
    visible = false,
    onOk = () => {},
    onCancel = () => {},
}) {
    const { t } = useTranslation()

    return (
        <Modal
            width={270}
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
            visible={visible}
            mask={false}
            maskClosable={false}
            closable={false}
            centered
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
                        onClick={onCancel}
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
        </Modal>
    )
}
