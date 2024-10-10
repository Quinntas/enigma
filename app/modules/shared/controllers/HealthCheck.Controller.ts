import {Controller} from "../../../../lib/core/Controller";

export class HealthCheckController extends Controller {
    constructor() {
        super();
    }

    handle() {
        return Response.json({message: 'ok'})
    }
}