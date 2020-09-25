export const messageDto = (channel, message) => {
    // console.log(message)
    const id = message.messageId ?? '1'
    const content =
        message.message ??
        'Use the haptic PNG feed, then you can quantify the back-end program!'
    const createdAt = message.createdAt ?? '2020-09-22T10:28:37.539Z'
    const isAdmin = message.messageType === 'admin' ?? false
    const isAuthor =
        message?._sender?.userId === localStorage.getItem('userId') ?? false
    const isFile = message.messageType === 'file' ?? false
    const name = 'Ms. Samir Kihn'
    const unreadCount = channel.getReadReceipt(message) ?? 84862
    const undeliveredCount = channel.getUndeliveredMemberCount(message) ?? 29930
    const url = message.url ?? 'http://lorempixel.com/640/480/business'

    return {
        content,
        createdAt,
        id,
        isAdmin,
        isAuthor,
        isFile,
        name,
        undeliveredCount,
        unreadCount,
        url,
    }
}
