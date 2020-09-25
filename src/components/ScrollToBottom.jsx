import React, { useRef, useLayoutEffect, memo } from 'react'

function ScrollToBottom({ style, handleLoadMore = () => {}, children }) {
    const scrollRef = useRef(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        // console.log('🤬')
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useLayoutEffect(() => {
        // console.log('😭')

        scrollToBottom()
    }, [])

    useLayoutEffect(() => {
        const scrollTop = scrollRef.current?.scrollTop
        const clientHeight = scrollRef.current?.clientHeight
        const scrollHeight = scrollRef.current?.scrollHeight
        const endReached = scrollTop + clientHeight >= scrollHeight - 108
        // console.log('🥰', scrollTop, clientHeight, scrollHeight, endReached)
        if (endReached) {
            scrollToBottom()
        } else {
            // console.log('new Message')
        }
    }, [children])

    return (
        <div
            style={style}
            ref={scrollRef}
            onScroll={() => {
                // console.log(
                //     scrollRef.current.scrollTop
                // )
                if (scrollRef.current.scrollTop === 0) {
                    handleLoadMore()
                }
            }}
        >
            {children}
            <div ref={messagesEndRef} />
        </div>
    )
}

// export const MemoizedScrollToBottom = ScrollToBottom

export const MemoizedScrollToBottom = memo(ScrollToBottom)
