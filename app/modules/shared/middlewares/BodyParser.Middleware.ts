import {Middleware} from "../../../../lib/core/Middleware";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {jsonResponse} from "../../../../lib/core/Response";
import {ZodError} from "zod";

export class BodyParserMiddleware extends Middleware {
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