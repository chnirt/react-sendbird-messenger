export const memberDto = (member) => {
    const id = member.userId ?? '1'
    const connectionStatus = member.connectionStatus === 'online' ?? true
    const avatar = member.plainProfileUrl
    const lastSeenAt = member.lastSeenAt ?? '2020-09-21T23:26:57.734Z'
    const name = member.nickname ?? 'Bridget Braun'

    return { avatar, connectionStatus, id, lastSeenAt, name }
}
