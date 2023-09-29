export class UserWithHobbiesLinkResponseDto {
    constructor(user, links) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this._links = links.links
    }

    static from(domainUser, links) {
        return new UserWithHobbiesLinkResponseDto(domainUser, links)
    }
}