import React from 'react'
import { Button, Modal, Avatar, Typography } from 'antd'
import { WhatsAppOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { ACCEPT, DEFAULT_IMG, REJECT } from '@constants'

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
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                    <Button
                        style={{ border: 0 }}
                        icon={
                            <WhatsAppOutlined
                                style={{ fontSize: 30, color: ACCEPT }}
                            />
                        }
                        type="ghost"
                        size="large"
                        onClick={onOk}
                    />
                    <Button
                        style={{ border: 0 }}
                        icon={
                            <CloseCircleOutlined
                                style={{ fontSize: 30, color: REJECT }}
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
