import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {jsonResponse} from "../../../../lib/core/Response";
import {ZodError} from "zod";
import {Logger} from "../../../../bin/Logger";
import {ServiceError} from "../../../../lib/core/Errors";

export class ErrorHandlerMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        try {
            await next();
        } catch (e: unknown) {
            if (e instanceof Error) {
                if (ctx.server.development)
                    this.logger.error(e)

                if (e instanceof ZodError)
                    return jsonResponse(ctx, 422, {
                        message: 'Validation error',
                        errors: e.errors
                    });

                else if (e instanceof ServiceError)
                    return jsonResponse(ctx, e.statusCode, e.body);

                if (ctx.server.development)
                    return jsonResponse(ctx, 500, {
                        message: e.message,
                        stack: e.stack
                    });

                return jsonResponse(ctx, 500, {
                    message: 'Internal server error'
                });
            }
            throw e;
        }
    }
}