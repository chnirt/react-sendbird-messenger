import React, { useRef } from 'react'
import { Picker } from 'emoji-mart'

import { useClickOutSide } from '@hooks'
import { PRIMARY_COLOR } from '@constants'

export function MyPicker({
    style,
    show = false,
    handleEmojiMart = () => {},
    handleClickOutSide = () => {},
}) {
    const emojiMartRef = useRef()

    useClickOutSide(emojiMartRef, handleClickOutSide)

    return (
        show && (
            <div ref={emojiMartRef}>
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
            </div>
        )
    )
}
