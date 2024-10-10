import {Controller} from "../../../../lib/core/Controller";
import {jsonResponse} from "../../../../lib/core/Response";
import {HttpContext} from "../../../../lib/core/HttpContext";

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