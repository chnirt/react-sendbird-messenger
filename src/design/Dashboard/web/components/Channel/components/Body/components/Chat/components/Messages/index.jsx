import React, { Fragment, useState } from 'react'
import Draggable from 'react-draggable'

import { MessageSkeleton, MemoizedScrollToBottom } from '@components'
import { THIRD_COLOR } from '@constants'

export function Messages() {
    const loadingListMessages = false
    function handleLoadMore() {}

    const [activeDrags, setActiveDrags] = useState(0)

    function onStart() {
        setActiveDrags(+activeDrags)
    }

    function onStop() {
        setActiveDrags(-activeDrags)
    }

    const dragHandlers = { onStart, onStop }

    return (
        <Fragment>
            <MessageSkeleton
                loading={loadingListMessages}
                rows={13}
                size="default"
                avatar
            >
                <MemoizedScrollToBottom
                    style={{
                        height: 'calc(100vh - 122px)',
                        borderBottom: `1px solid ${THIRD_COLOR}`,
                        overflowY: 'auto',
                        paddingBottom: 30,
                    }}
                    handleLoadMore={handleLoadMore}
                >
                    <Draggable bounds="parent" {...dragHandlers}>
                        <video
                            style={{
                                background: '#000',
                                border: '1px solid #999',
                                borderRadius: 3,
                                width: 1280 * 0.2,
                                height: 720 * 0.2,
                                margin: 10,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}
                            id="local_video_element_id"
                            autoPlay
                        />
                    </Draggable>
                    {/* {renderListMessages(messages)} */}
                    xxxx
                </MemoizedScrollToBottom>
            </MessageSkeleton>
        </Fragment>
    )
}
