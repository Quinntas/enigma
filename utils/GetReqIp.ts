import {HttpContext} from "../lib/core/HttpContext";

export function getReqIp(ctx: HttpContext): string {
    const reqIp = ctx.server.requestIP(ctx.request);
    if (!reqIp) throw new Error('Request IP not found');
    return reqIp.address
}