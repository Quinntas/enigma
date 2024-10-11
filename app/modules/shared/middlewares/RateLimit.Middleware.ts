import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {Cache} from "../../../../lib/core/Cache";
import {getReqIp} from "../../../../utils/GetReqIp";
import {jsonResponse} from "../../../../lib/core/Response";

export class RateLimitMiddleware extends Middleware {
    constructor(
        private readonly cache: Cache
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        const reqIp = getReqIp(ctx);

        const key = `rate-limit:${reqIp}`;

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

        next()
    }
}