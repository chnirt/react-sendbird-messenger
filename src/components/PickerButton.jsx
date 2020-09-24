import React, { Fragment, useRef, useState } from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Picker } from 'emoji-mart'

import { useClickOutSide } from '@hooks'
import { PRIMARY_COLOR } from '@constants'

export function PickerButton({
    style,
    show = false,
    handleEmojiMart = () => {},
}) {
    const emojiMartRef = useRef()
    const [showEmojiMart, setShowEmojiMart] = useState(false)

    useClickOutSide(emojiMartRef, handleClickOutSide)

    function handleClickOutSide() {
        setShowEmojiMart(false)
    }

    return (
        <Fragment>
            <div ref={emojiMartRef}>
                {showEmojiMart && (
                    <Picker
                        style={style}
                        title="Pick your emoji…"
                        emoji="point_up"
                        size={20}
                        emojiSize={20}
                        color={PRIMARY_COLOR}
                        showPreview={false}
                        showSkinTones={false}
                        set="apple"
                        onSelect={handleEmojiMart}
                    />
                )}
                <Button
                    style={{ border: 0 }}
                    type="ghost"
                    icon={<SmileOutlined />}
                    size="large"
                    onClick={() => setShowEmojiMart((prevState) => !prevState)}
                />
            </div>
        </Fragment>
    )
}
