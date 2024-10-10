import {Response as EnigmaResponse} from './Types'
import {HttpContext} from "./HttpContext";

export function serializeEnigmaResponse(response: EnigmaResponse): Response {
    return new Response(response.body, {
        status: response.statusCode,
        headers: response.headers
    })
}

export function jsonResponse<T>(ctx: HttpContext, status: number, body: T): void {
    ctx.response.statusCode = status;
    ctx.response.headers.set('Content-Type', 'application/json');
    ctx.response.body = JSON.stringify(body);
}

export function textResponse(ctx: HttpContext, status: number, body: string): void {
    ctx.response.statusCode = status;
    ctx.response.headers.set('Content-Type', 'text/plain');
    ctx.response.body = body;
}

export function htmlResponse(ctx: HttpContext, status: number, body: string): void {
    ctx.response.statusCode = status;
    ctx.response.headers.set('Content-Type', 'text/html');
    ctx.response.body = body;
}