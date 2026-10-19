export class BadRequestError extends Error {
    statusCode: number


    constructor() {
        super();
        this.name = 'BadRequestError';
        this.message = 'Bad Request'
        this.statusCode = 400;
    }
}