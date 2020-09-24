import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { ReactComponent as Sent } from '@assets/images/chat/check.svg'
import { ReactComponent as Delivered } from '@assets/images/chat/tick.svg'
import { ReactComponent as Seen } from '@assets/images/chat/color-tick.svg'

export function LastMessageStatus({ status }) {
    if (status === 'sending') {
        return <LoadingOutlined />
    }

    if (status === 'sent') {
        return <Sent style={{ height: 14, width: 14 }} />
    }

    if (status === 'delivered') {
        return <Delivered style={{ height: 14, width: 14 }} />
    }

    if (status === 'seen') {
        return <Seen style={{ height: 14, width: 14 }} />
    }
}
