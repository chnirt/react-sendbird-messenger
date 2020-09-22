export const getUsers = async () => {
    let response = await fetch(
        'https://5f0ea5f8faef3500160b8663.mockapi.io/users'
    )
    let data = await response.json()
    return data
}

export const getMembers = async () => {
    let response = await fetch(
        'https://5f0ea5f8faef3500160b8663.mockapi.io/users?page=1&limit=5'
    )
    let data = await response.json()
    return data
}

export const getChannels = async () => {
    let response = await fetch(
        'https://5f0ea5f8faef3500160b8663.mockapi.io/channels'
    )
    let data = await response.json()
    return data
}

export const getChannel = async (id) => {
    let response = await fetch(
        `https://5f0ea5f8faef3500160b8663.mockapi.io/channels/${id}`
    )
    let data = await response.json()
    return data
}
