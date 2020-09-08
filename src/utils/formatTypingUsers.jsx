export const formatTypingUsers = (members = []) => {
    if (members.length === 1) {
        return members.join(',') + ' is typing.'
    }

    if (members.length === 2) {
        return members.join(' and ') + ' are typing.'
    }

    if (members.length > 2) {
        return 'several people are typing'
    }

    return ''
}
