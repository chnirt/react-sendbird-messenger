import React, { Fragment } from 'react'
import { Button } from 'antd'

import { Emoji } from './Emoji'

export function Emoticons({ handleEmoji = () => {} }) {
    return (
        <Fragment>
            <Button
                onClick={() => handleEmoji('love')}
                type="text"
                size="small"
                icon={<Emoji label="love" symbol="❤️" />}
            />
            <Button
                onClick={() => handleEmoji('smile')}
                type="text"
                size="small"
                icon={<Emoji label="smile" symbol="😆" />}
            />
            <Button
                onClick={() => handleEmoji('subscribe')}
                type="text"
                size="small"
                icon={<Emoji label="subscribe" symbol="😮" />}
            />
            <Button onClick={() => handleEmoji('cry')} type="text" size="small">
                <Emoji label="cry" symbol="😢" />
            </Button>
            <Button
                onClick={() => handleEmoji('angry')}
                type="text"
                size="small"
                icon={<Emoji label="angry" symbol="😠" />}
            />
            <Button
                onClick={() => handleEmoji('like')}
                type="text"
                size="small"
                icon={<Emoji label="like" symbol="👍" />}
            />
            <Button
                onClick={() => handleEmoji('dislike')}
                type="text"
                size="small"
                icon={<Emoji label="dislike" symbol="👎" />}
            />
        </Fragment>
    )
}
