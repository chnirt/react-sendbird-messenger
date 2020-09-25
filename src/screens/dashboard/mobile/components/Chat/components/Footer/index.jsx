import React, { useState } from 'react'
import { Col, Input, Row, message, Upload, Button } from 'antd'
import { PictureOutlined, LikeOutlined } from '@ant-design/icons'

import { PickerButton } from '@components'
import { PRIMARY_COLOR } from '@constants'
import { useDashboard, useSendBird } from '@context'
import { messageDto } from '@dto'

export function Footer() {
    const { channel, setMessages } = useDashboard()
    const { sendUserMessage, sendFileMessage } = useSendBird()

    const [typingText, setTypingText] = useState('')

    const handleEmojiMart = (emoji) => {
        setTypingText((prevState) => prevState + emoji.native)
    }

    const onChange = (e) => {
        setTypingText(e.target.value)
    }

    const handleSendMessage = async (e) => {
        if (e.keyCode === 13) {
            // console.log(typingText)
            const newUserMessage = await sendUserMessage(channel, typingText)
            // console.log(newUserMessage)
            const formatNewUserMessage = messageDto(channel, newUserMessage)
            setMessages((prevState) => [...prevState, formatNewUserMessage])
            setTypingText('')
        }
    }

    const handleUploadFile = async (file) => {
        try {
            console.log(file)
            const fileMessage = await sendFileMessage(
                channel,
                file,
                file.name,
                file.size,
                file.type
            )
            const formatNewUserMessage = messageDto(channel, fileMessage)
            setMessages((prevState) => [...prevState, formatNewUserMessage])
            fileMessage && message.success('File updated successfully.')
        } catch (error) {
            message.error(error)
        }
    }

    const handleLike = () => {
        setTypingText((prevState) => prevState + '👍')
    }

    return (
        <Row
            style={{
                height: 60,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Col
                style={{
                    padding: 12,
                    width: 'calc(100% - 120px)',
                }}
            >
                <Input
                    placeholder="Type a message..."
                    value={typingText}
                    onChange={onChange}
                    onKeyDown={handleSendMessage}
                    onFocus={() => channel.startTyping()}
                    onBlur={() => channel.endTyping()}
                />
            </Col>
            <Col
                style={{
                    float: 'right',
                    display: 'flex',
                }}
            >
                <Upload beforeUpload={handleUploadFile} showUploadList={false}>
                    <Button
                        style={{
                            border: 0,
                            display: 'inline-block',
                            cursor: 'pointer',
                        }}
                        type="ghost"
                        icon={<PictureOutlined />}
                        size="large"
                    />
                </Upload>

                <PickerButton
                    style={{
                        position: 'absolute',
                        bottom: 42,
                        right: 42,
                    }}
                    handleEmojiMart={handleEmojiMart}
                />

                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={
                        <LikeOutlined
                            style={{
                                color: PRIMARY_COLOR,
                            }}
                        />
                    }
                    size="large"
                    onClick={handleLike}
                />
            </Col>
        </Row>
    )
}
