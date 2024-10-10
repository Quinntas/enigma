import {Middleware} from "../../../../lib/core/Middleware";
import {Logger} from "../../../../bin/Logger";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {jsonResponse} from "../../../../lib/core/Response";
import {ZodError} from "zod";

export class BodyParserMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        try {
            await next();
        } catch (e: unknown) {
            if (e instanceof ZodError)
                return jsonResponse(ctx, 422, {
                    message: 'Validation error',
                    errors: e.errors
                })

            throw e
        }
    }
}