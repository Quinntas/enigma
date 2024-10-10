import {Json} from "./Types";

export class HttpError extends Error {
    constructor(
        private readonly _statusCode: number,
        message: string,
        private readonly _body: Json
    ) {
        super(message);
        this.name = 'HttpError';
        this._body = {
            ..._body,
            message
        }
    }

    get statusCode() {
        return this._statusCode;
    }

    get body() {
        return this._body;
    }
}

export class ServiceError extends HttpError {
    constructor(
        statusCode: number,
        message: string,
        body?: Json
    ) {
        super(statusCode, message, body ?? {});
        this.name = 'ServiceError';
    }
}