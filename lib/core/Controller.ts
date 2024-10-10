import {Response} from "./Types";
import {HttpContext} from "./HttpContext";

export abstract class Controller {
    abstract handle(ctx: HttpContext): Response | Promise<Response>;
}