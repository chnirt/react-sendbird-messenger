import React, { Fragment } from 'react'

import { MessageSkeleton, MemoizedScrollToBottom } from '@components'
import { THIRD_COLOR } from '@constants'

export function Messages() {
    const loadingListMessages = false
    function handleLoadMore() {}

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
                    {/* {renderListMessages(messages)} */}
                    xxxx
                </MemoizedScrollToBottom>
            </MessageSkeleton>
        </Fragment>
    )
}
