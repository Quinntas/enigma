import {Server} from "bun";
import {Json, Request, Response} from "./Types";

export class HttpContext {
    constructor(
        public request: Request,
        public response: Response,
        public server: Server,
        public json: Json = {},
    ) {
    }
}