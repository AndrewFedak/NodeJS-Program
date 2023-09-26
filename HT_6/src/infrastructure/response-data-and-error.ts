export class ResponseDataAndError {
    static format(data: any, error: unknown = null) {
        return {
            data,
            error,
        }
    }
}