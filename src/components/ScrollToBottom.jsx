import React, { useRef, useLayoutEffect, memo } from 'react'

function ScrollToBottom({ children }) {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useLayoutEffect(scrollToBottom, [])

    return (
        <div>
            {children}
            <div ref={messagesEndRef} />
        </div>
    )
}

export const MemoizedScrollToBottom = memo(ScrollToBottom)
