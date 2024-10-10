import {NextFn} from "./Types";
import {HttpContext} from "./HttpContext";

export abstract class Middleware {
    abstract handle(ctx: HttpContext, next: NextFn): void | Promise<void>;
}