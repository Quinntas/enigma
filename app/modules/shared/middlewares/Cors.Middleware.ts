import {Middleware} from "../../../../lib/core/Middleware";
import {Logger} from "../../../../bin/Logger";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";

export class CorsMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        ctx.response.headers.set('Access-Control-Allow-Origin', '*')
        ctx.response.headers.set('Access-Control-Allow-Headers', '*')
        ctx.response.headers.set('Access-Control-Allow-Methods', '*')
        ctx.response.headers.set('Access-Control-Allow-Credentials', 'true')
        ctx.response.headers.set('Access-Control-Max-Age', '86400')
        next()
    }
}