import React from 'react'

export function Emoji({ label = '', symbol = '🤬' }) {
    return (
        <span
            className="emoji"
            role="img"
            aria-label={label}
            aria-hidden={label ? 'false' : 'true'}
        >
            {symbol}
        </span>
    )
}
