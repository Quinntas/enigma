import {Controller} from "../../../../../lib/core/Controller";
import {HttpContext} from "../../../../../lib/core/HttpContext";
import {jsonResponse} from "../../../../../lib/core/Response";

export class HealthCheckController extends Controller {
    constructor() {
        super();
    }

    handle(ctx: HttpContext) {
        return jsonResponse(ctx, 200, {
            message: "ok"
        })
    }
}