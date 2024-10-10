import {Middleware} from "../../../../lib/core/Middleware";
import {Logger} from "../../../../bin/Logger";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {jsonResponse} from "../../../../lib/core/Response";

export class EnsureAuthenticatedMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger
    ) {
        super();
    }

    async handle(ctx: HttpContext, next: NextFn) {
        const token = ctx.request.headers.get('Authorization')

        if (!token)
            return jsonResponse(ctx, 401, {message: 'Unauthorized'})

        const bearer = token.split(' ')

        if (bearer.length !== 2 || bearer[0] !== 'Bearer')
            return jsonResponse(ctx, 401, {message: 'Unauthorized'})

        next()
    }
}