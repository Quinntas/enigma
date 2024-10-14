import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";

export class PerformanceMiddleware extends Middleware {
    async handle(ctx: HttpContext, next: NextFn) {
        const start = performance.now()
        await next()
        const end = performance.now()
        ctx.response.headers.set('X-Response-Time', `${end - start}ms`)
    }
}