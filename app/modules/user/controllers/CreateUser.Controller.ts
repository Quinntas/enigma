import {Controller} from "../../../../lib/core/Controller";
import {HttpContext} from "../../../../lib/core/HttpContext";
import {UserService} from "../service/User.Service";

export class CreateUserController extends Controller {
    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    async handle(ctx: HttpContext): Promise<Response> {
        if (!ctx.json)
            return Response.json(
                {message: 'Body is required'},
                {status: 400}
            )

        if (!ctx.json.email || typeof ctx.json.email !== 'string')
            return Response.json(
                {message: 'Email is required'},
                {status: 400}
            )

        if (!ctx.json.password || typeof ctx.json.password !== 'string')
            return Response.json(
                {message: 'Password is required'},
                {status: 400}
            )

        try {
            await this.userService.createUser(
                ctx.json.email,
                ctx.json.password
            )
        } catch {
            return Response.json(
                {message: 'Failed to create user'},
                {status: 400}
            )
        }

        return Response.json(
            {message: 'Created'},
            {status: 201}
        )
    }
}