export const filterUsers = (searchText, users = []) => {
    const filteredUsers = users.filter((user) =>
        user.value.includes(searchText)
    )
    return filteredUsers
}
