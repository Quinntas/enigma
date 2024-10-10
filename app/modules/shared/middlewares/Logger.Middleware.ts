import {Logger} from "../../../../bin/Logger";
import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";

export class LoggerMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    handle(ctx: HttpContext, next: NextFn) {
        const reqIp = ctx.server.requestIP(ctx.request);
        let ip = 'unknown';
        if (reqIp) ip = `${reqIp.address}`;
        const logEntry = `${ip} - - [${new Date().toISOString()}] "${ctx.request.method} ${ctx.request.url} ${ctx.request.headers.get('user-agent')}"`;
        this.logger.info(logEntry);
        next();
    }
}