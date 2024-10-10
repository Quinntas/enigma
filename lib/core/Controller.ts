import {HttpContext} from "./HttpContext";

export abstract class Controller {
    abstract handle(ctx: HttpContext): void | Promise<void>
}