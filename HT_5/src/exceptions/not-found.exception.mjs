import { HttpStatus } from "./http-statuses.mjs";
import { HttpException } from "./http.exceptions.mjs";

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found') {
        super(message, HttpStatus.NOT_FOUND)
    }
}