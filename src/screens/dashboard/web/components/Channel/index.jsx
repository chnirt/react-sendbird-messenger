import React, { Fragment, useState } from 'react'

import { Header, Body } from './components'

export function Channel() {
    const [showDetail, setShowDetail] = useState(false)

    const toggleShowDetail = () => {
        setShowDetail((prevState) => !prevState)
    }

    return (
        <Fragment>
            <Header
                detailVisible={showDetail}
                toggleShowDetail={toggleShowDetail}
            />
            <Body detailVisible={showDetail} />
        </Fragment>
    )
}
