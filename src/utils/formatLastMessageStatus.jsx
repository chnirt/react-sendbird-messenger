export function formatLastMessageStatus(
    isAuthor,
    unreadCount,
    undeliveredCount
) {
    if (!isAuthor) return false

    const isRead = unreadCount === 0 || false
    const isDelivered = undeliveredCount === 0 || false

    if (isRead) {
        return 'seen'
    }

    if (isDelivered) {
        return 'delivered'
    }

    return 'sent'
}
