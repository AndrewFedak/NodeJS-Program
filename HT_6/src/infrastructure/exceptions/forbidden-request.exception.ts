import { HttpStatus } from "./http-statuses.js";
import { HttpException } from "./http.exceptions.js";

export class ForbiddenRequestException extends HttpException {
    constructor(message = 'Forbidden') {
        super(message, HttpStatus.FORBIDDEN)
    }
}