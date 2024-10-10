import {Server} from "bun";
import {Json, Request, Response} from "./Types";

export class HttpContext {
    private _container: Map<string, any>

    constructor(
        public request: Request,
        public response: Response,
        public server: Server,
        public json: Json = {},
    ) {
        this._container = new Map<string, any>()
    }

    get<T>(key: string): T | undefined {
        return this._container.get(key) as T
    }

    set<T>(key: string, value: T): void {
        this._container.set(key, value)
    }
}