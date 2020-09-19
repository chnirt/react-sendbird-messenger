import React, { Fragment } from 'react'
import { Row } from 'antd'

import { MyAutoComplete, MySkeleton } from '@components'
import { THIRD_COLOR } from '@constants'

export function Body() {
    return (
        <Fragment>
            <Row
                style={{
                    height: 60,
                    borderBottom: `1px solid ${THIRD_COLOR}`,
                    padding: 12,
                }}
            >
                <MyAutoComplete
                    style={{ width: '100%' }}
                    // options={options}
                    // onSelect={onSelectMyAutoComplete}
                    // onSearch={onSearchMyAutoComplete}
                />
            </Row>
            <div
                style={{
                    height: 'calc(100vh - 122px)',
                    overflowY: 'auto',
                    paddingBottom: 12,
                }}
            >
                <MySkeleton loading={false} rows={13} size="default" avatar>
                    {/* {renderChannelList(channels)} */}
                    xxxxx
                </MySkeleton>
            </div>
        </Fragment>
    )
}
