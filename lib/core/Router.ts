import {Controller} from "./Controller";
import {Middleware} from "./Middleware";
import {Method, Route} from "./Types";

export class Router {
    private readonly _routes: Route[];
    private readonly _middlewares: Middleware[];

    constructor() {
        this._routes = [];
        this._middlewares = [];
    }

    get routes() {
        return this._routes;
    }

    useMiddleware(middleware: Middleware) {
        this._middlewares.push(middleware);
    }

    useController(path: string, methods: Method[], controller: Controller, middlewares: Middleware[] = []) {
        const concatMiddlewares = [...this._middlewares, ...middlewares];
        this._routes.push({
            path,
            methods,
            controller,
            middlewares: concatMiddlewares
        })
    }

    get(path: string, controller: Controller, middlewares: Middleware[] = []) {
        this.useController(path, ['GET'], controller, middlewares)
    }

    post(path: string, controller: Controller, middlewares: Middleware[] = []) {
        this.useController(path, ['POST'], controller, middlewares)
    }
}