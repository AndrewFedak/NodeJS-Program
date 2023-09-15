export class Links {
    _links = {}
    constructor(req, links) {
        const protocol = req.connection.encrypted ? 'https' : 'http';
        const hostname = req.headers.host;
        const path = req.url;

        this.mapLinksToHateoas({ self: `${protocol}://${hostname}${path}`, ...links })
    }
    get links() {
        return this._links
    }
    mapLinksToHateoas(links) {
        Object.entries(links).forEach(([linkName, href]) => {
            this._links[linkName] = { href }
        })
    }
}