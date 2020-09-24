import React, { Fragment, useLayoutEffect, useState } from 'react'
import { Row } from 'antd'

import { MyAutoComplete, MySkeleton } from '@components'
import { THIRD_COLOR } from '@constants'
import { getChannels, getUsers } from '@mock'
import { useDashboard } from '@context'
import { filterUsers } from '@utils'
import { ChannelItem } from './components'

export function Body() {
    const {
        channelsLoading,
        setChannelsLoading,
        channels,
        setChannels,
    } = useDashboard()

    const [options, setOptions] = useState([])

    useLayoutEffect(() => {
        const fetchChannels = async () => {
            setChannelsLoading(true)
            try {
                const data = await getChannels()
                // console.log(data)
                setChannels(data)
                setChannelsLoading(false)
            } catch (error) {
                setChannelsLoading(false)
            }
        }

        fetchChannels()
    }, [setChannelsLoading, setChannels])

    const onSearchMyAutoComplete = async (searchText) => {
        if (!!searchText) {
            let users = await getUsers()

            const filteredUsers = filterUsers(searchText, users)

            setOptions(filteredUsers)
        } else {
            setOptions([])
        }
    }

    const onSelectMyAutoComplete = async (data) => {
        console.log('onSelect', data)
    }

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
                    options={options}
                    onSelect={onSelectMyAutoComplete}
                    onSearch={onSearchMyAutoComplete}
                />
            </Row>
            <div
                style={{
                    height: 'calc(100vh - 122px)',
                    overflowY: 'auto',
                    paddingBottom: 12,
                }}
            >
                <MySkeleton
                    loading={channelsLoading}
                    rows={13}
                    size="default"
                    avatar
                >
                    {channels.map((channel, i) => {
                        return <ChannelItem key={i} channel={channel} />
                    })}
                </MySkeleton>
            </div>
        </Fragment>
    )
}
