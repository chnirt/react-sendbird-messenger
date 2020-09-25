export const formatLastMessage = (lastMessage = {}) => {
    // console.log(lastMessage)
    if (!lastMessage) {
        return ''
    }

    let text = lastMessage?.message

    const isAdmin = lastMessage?.messageType === 'admin'

    if (isAdmin) {
        return 'Admin: ' + text
    }

    const isAuthor =
        lastMessage?._sender?.userId === localStorage.getItem('userId')

    const isFile = lastMessage?.messageType === 'file'

    if (isFile) {
        text = 'sent an attachment'
    }

    if (isAuthor) {
        text = 'You: ' + lastMessage?.message

        if (isFile) {
            text = 'You: sent an attachment'
        }
    }

    return text
}
