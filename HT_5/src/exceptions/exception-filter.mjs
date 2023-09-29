import { HttpStatus } from "./http-statuses.mjs"
import { HttpException } from "./http.exceptions.mjs"

export const exceptionFilter = (err, res) => {
    if (err instanceof HttpException) {
        return res.status(err.status).sendError(err)
    }
    if (err instanceof Error) {
        return res.status(HttpStatus.INTERNAL_ERROR).sendError(new HttpException(err.message))
    }
    return res.status(HttpStatus.INTERNAL_ERROR).sendError(new HttpException())
}