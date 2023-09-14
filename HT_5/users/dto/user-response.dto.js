class UserResponseDto {
    constructor(user) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
    }

    static from(domainUser) {
        return new UserResponseDto(domainUser)
    }

    static fromEntries(domainUsers) {
        return domainUsers.map(UserResponseDto.from)
    }
}

module.exports.UserResponseDto = UserResponseDto