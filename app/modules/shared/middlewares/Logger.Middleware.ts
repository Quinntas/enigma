import {Logger} from "../../../../bin/Logger";
import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {getReqIp} from "../../../../utils/GetReqIp";

export class LoggerMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    handle(ctx: HttpContext, next: NextFn) {
        const reqIp = getReqIp(ctx);
        const logEntry = `${reqIp} - - [${new Date().toISOString()}] "${ctx.request.method} ${ctx.request.url} ${ctx.request.headers.get('user-agent')}"`;
        this.logger.info(logEntry);
        next();
    }
}