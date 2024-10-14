import {createUserSchema} from "./CreateUser.Schema";
import {Controller} from "../../../../../lib/core/Controller";
import {UserService} from "../../service/User.Service";
import {HttpContext} from "../../../../../lib/core/HttpContext";
import {bodyParser} from "../../../../../lib/core/BodyParser";
import {jsonResponse} from "../../../../../lib/core/Response";


export class CreateUserController extends Controller {
    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    async handle(ctx: HttpContext) {
        const body = bodyParser(createUserSchema, ctx.json);

        await this.userService.createUser(body.email, body.password)

        return jsonResponse(ctx, 201, {message: 'Created Successfully'})
    }
}