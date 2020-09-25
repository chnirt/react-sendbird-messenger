import { formatLastMessage } from '@utils'

export const channelDto = (channel) => {
    // console.log(channel)
    const id = channel.url ?? '1'
    const url = ''
    const name =
        channel.members.filter(
            (member) => member.userId !== localStorage.getItem('userId')
        )[0]?.nickname ?? 'Empty Room'
    const lastMessage =
        formatLastMessage(channel.lastMessage) ??
        'We need to compress the haptic CSS hard drive!'
    const isUnread = channel.unreadMessageCount > 0 ?? false
    const createdAt = channel.createdAt ?? '2020-09-21T18:45:43.976Z'
    const members = channel.members ?? []
    return {
        id,
        url,
        name,
        lastMessage,
        isUnread,
        createdAt,
        members,
    }
}
