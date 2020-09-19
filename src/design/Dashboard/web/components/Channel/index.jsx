import React, { Fragment, useState } from 'react'

import { Header, Body } from './components'

export function Channel() {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <Fragment>
            <Header
                detailVisible={showDetail}
                toggleShowDetail={() =>
                    setShowDetail((prevState) => !prevState)
                }
            />
            <Body detailVisible={showDetail} />
        </Fragment>
    )
}
