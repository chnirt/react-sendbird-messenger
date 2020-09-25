import React, { Fragment, useLayoutEffect, useState } from 'react'
import { Row } from 'antd'

import { MyAutoComplete, MySkeleton } from '@components'
import { THIRD_COLOR } from '@constants'
// import { getChannels, getUsers } from '@mock'
import { useDashboard, useSendBird } from '@context'
import { filterUsers } from '@utils'
import { ChannelItem } from './components'
import { channelDto, userDto } from '@dto'

export function Body() {
    const {
        channelsLoading,
        setChannelsLoading,
        channels,
        setChannels,
        setChannel,
    } = useDashboard()
    const {
        channelListQuery,
        userListQuery,
        createChannelWithUserIds,
        onChannelChanged,
        onUserReceivedInvitation,
        joinChannel,
        onUserLeft,
    } = useSendBird()

    const [options, setOptions] = useState([])

    useLayoutEffect(() => {
        const fetchChannels = async () => {
            setChannelsLoading(true)
            try {
                // const data = await getChannels()
                const data = await channelListQuery()
                const dataDto = data.map((element) => channelDto(element))

                data.filter(
                    (channel) => channel.channelType === 'group'
                ).map((channel) => channel.markAsDelivered())

                setChannels(dataDto)
                setChannelsLoading(false)
            } catch (error) {
                setChannelsLoading(false)
            }
        }

        fetchChannels()
    }, [setChannelsLoading, setChannels, channelListQuery])

    useLayoutEffect(() => {
        listenOnChannelChanged()
        listenOnUserReceivedInvitation()
        listenOnUserLeft()
    })

    const listenOnChannelChanged = async () => {
        const { channel } = await onChannelChanged()

        setChannels((prevState) => {
            const cloneChannels = prevState.map((element) => {
                if (element.id === channel.url) {
                    const formatChannel = channelDto(channel)

                    return formatChannel
                }
                return element
            })

            return cloneChannels
        })
    }

    const listenOnUserReceivedInvitation = async () => {
        const {
            groupChannel,
            inviter,
            invitees,
        } = await onUserReceivedInvitation()
        console.log(groupChannel, inviter, invitees)
        const formatChannel = channelDto(groupChannel)
        setChannels((prevState) => [...prevState, formatChannel])
        const response = await joinChannel(groupChannel)
        console.log(response)
    }

    const listenOnUserLeft = async () => {
        const { groupChannel } = await onUserLeft()

        if (
            !groupChannel.members.some(
                (member) => member.userId === localStorage.getItem('userId')
            )
        ) {
            setChannel(null)
            setChannels((prevState) =>
                prevState.filter((element) => element.id !== groupChannel.url)
            )
        } else {
            setChannels((prevState) => {
                const cloneChannels = prevState.map((element) => {
                    if (element.id === groupChannel.url) {
                        const formatChannel = channelDto(groupChannel)
                        return formatChannel
                    }
                    return element
                })
                return cloneChannels
            })
        }
    }

    const onSearchMyAutoComplete = async (searchText) => {
        if (!!searchText) {
            // const users = await getUsers()
            const users = await userListQuery()
            const usersDto = users
                .filter(
                    (element) =>
                        element.userId !== localStorage.getItem('userId')
                )
                .map((element) => userDto(element))

            const filteredUsers = filterUsers(searchText, usersDto)

            setOptions(filteredUsers)
        } else {
            setOptions([])
        }
    }

    const onSelectMyAutoComplete = async (data) => {
        console.log('onSelect', data)
        const response = await createChannelWithUserIds(
            [data],
            true,
            'personalChat'
        )
        console.log(response)
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
