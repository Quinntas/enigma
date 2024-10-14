import {Logger} from "../../../../bin/Logger";
import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn, SocketAddress} from "../../../../lib/core/Types";
import {SetIPMiddleware} from "./SetIP.Middleware";

export class LoggerMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        const reqIp = ctx.get<SocketAddress>(SetIPMiddleware.CTX_KEY)
        const logEntry = `${reqIp.address} - - [${new Date().toISOString()}] "${ctx.request.method} ${ctx.request.url} ${ctx.request.headers.get('user-agent')}"`;
        this.logger.info(logEntry);
        await next()
    }
}