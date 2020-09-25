export const userDto = (user) => {
    // console.log(user)
    const value = user.userId ?? ''

    return {
        value,
    }
}
