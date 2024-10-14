import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";

export class SetIPMiddleware extends Middleware {
    public static readonly CTX_KEY = "request:ip";

    async handle(ctx: HttpContext, next: NextFn) {
        const reqIp = ctx.server.requestIP(ctx.request);
        if (!reqIp) throw new Error('Request IP not found');

        if (reqIp.address === '::1' && !ctx.server.development)
            throw new Error('Request IP not found');

        ctx.set(SetIPMiddleware.CTX_KEY, reqIp);

        await next()
    }
}