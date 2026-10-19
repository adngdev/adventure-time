export class UnauthorisedError extends Error {
    statusCode: number

    constructor() {
        super();
        this.name = 'UnauthorisedError';
        this.message = 'Unauthorised'
        this.statusCode = 401;
    }
}