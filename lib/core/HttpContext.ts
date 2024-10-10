import {Server} from "bun";
import {Json, Request} from "./Types";

export class HttpContext {
    constructor(
        public request: Request,
        public server: Server,
        public json: Json = {},
    ) {
    }
}