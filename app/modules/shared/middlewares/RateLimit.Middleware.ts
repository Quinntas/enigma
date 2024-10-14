import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn, SocketAddress} from "../../../../lib/core/Types";
import {Cache} from "../../../../lib/core/Cache";
import {jsonResponse} from "../../../../lib/core/Response";
import {SetIPMiddleware} from "./SetIP.Middleware";

export class RateLimitMiddleware extends Middleware {
    constructor(
        private readonly cache: Cache
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        const reqIp = ctx.get<SocketAddress>(SetIPMiddleware.CTX_KEY)

        const key = `rate-limit:${reqIp.address}`;

        const value = await this.cache.get(key);
        const parsedValue = parseInt(value || '0');

        if (!parsedValue)
            await this.cache.set(key, 1, 60);
        else if (parsedValue >= 10)
            return jsonResponse(ctx, 429, {
                message: 'Rate limit exceeded'
            })
        else
            await this.cache.set(key, parsedValue + 1, 60);

        await next()
    }
}