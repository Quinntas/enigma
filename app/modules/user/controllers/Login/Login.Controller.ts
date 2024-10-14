import {loginSchema} from "./Login.Schema";
import {Controller} from "../../../../../lib/core/Controller";
import {UserService} from "../../service/User.Service";
import {HttpContext} from "../../../../../lib/core/HttpContext";
import {bodyParser} from "../../../../../lib/core/BodyParser";
import {jsonResponse} from "../../../../../lib/core/Response";


export class LoginController extends Controller {
    constructor(
        private readonly userService: UserService
    ) {
        super();
    }

    async handle(ctx: HttpContext) {
        const body = bodyParser(loginSchema, ctx.json);

        const response = await this.userService.login(body.email, body.password)

        return jsonResponse(ctx, 200, response)
    }
}