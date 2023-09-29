import { HttpStatus } from "./http-statuses.mjs"

export class HttpException {
    constructor(message = 'Internal server error', status = HttpStatus.INTERNAL_ERROR) {
        this.message = message
        this.status = status
    }
}