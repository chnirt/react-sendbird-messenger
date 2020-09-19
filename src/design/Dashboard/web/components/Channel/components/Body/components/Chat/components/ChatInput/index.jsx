import React, { Fragment, useState } from 'react'
import { Button, Col, Input, Upload } from 'antd'
import { PictureOutlined, LikeOutlined } from '@ant-design/icons'

import { PickerButton } from '@components'
import { PRIMARY_COLOR } from '@constants'

export function ChatInput() {
    const [typingText, setTypingText] = useState('')

    function handleEmojiMart(emoji) {
        setTypingText((prevState) => prevState + emoji.native)
    }

    function handleSendMessage() {
        console.log(typingText)
    }

    return (
        <Fragment>
            <Col
                style={{
                    padding: 12,
                    width: 'calc(100% - 120px)',
                }}
            >
                <Input
                    placeholder="Type a message..."
                    value={typingText}
                    onChange={(e) => setTypingText(e.target.value)}
                    onKeyDown={handleSendMessage}
                    // onFocus={() => channel?.startTyping()}
                    // onBlur={() => channel?.endTyping()}
                />
            </Col>
            <Col
                style={{
                    float: 'right',
                    display: 'flex',
                }}
            >
                <Upload
                    // beforeUpload={handleUploadFile}
                    showUploadList={false}
                >
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
                <div>
                    <PickerButton
                        style={{
                            position: 'absolute',
                            bottom: 42,
                            right: 42,
                        }}
                        handleEmojiMart={handleEmojiMart}
                    />
                </div>

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
                />
            </Col>
        </Fragment>
    )
}
