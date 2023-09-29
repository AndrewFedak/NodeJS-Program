import { HttpStatus } from "./http-statuses.mjs";
import { HttpException } from "./http.exceptions.mjs";

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request') {
        super(message, HttpStatus.BAD_REQUEST)
    }
}