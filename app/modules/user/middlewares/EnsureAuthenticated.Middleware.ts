import {Middleware} from "../../../../lib/core/Middleware";
import {Logger} from "../../../../bin/Logger";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {NextFn} from "../../../../lib/core/Types";
import {jsonResponse} from "../../../../lib/core/Response";
import {JWT} from "../../../../utils/jwt";
import env from "../../../../start/Env";
import {UserRepository} from "../repository/User.Repository";
import {UserModel} from "../repository/User.Model";
import {AUTH_USER_CTX_KEY} from "../service/User.Constants";

export class EnsureAuthenticatedMiddleware extends Middleware {
    constructor(
        private readonly logger: Logger,
        private readonly userRepository: UserRepository,
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

        let decoded

        try {
            decoded = JWT.decode<{ email: string }>(bearer[1], env.JWT_SECRET)
        } catch {
            return jsonResponse(ctx, 401, {message: 'Unauthorized'})
        }

        const user = await this.userRepository.findByEmail(decoded.email)

        if (!user)
            return jsonResponse(ctx, 401, {message: 'Unauthorized'})

        ctx.set<UserModel>(AUTH_USER_CTX_KEY, user)

        next()
    }
}