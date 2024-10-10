import {Middleware} from "./Middleware";
import {Method, Route} from "./Types";
import {Controller} from "./Controller";
import {constructFullPath} from "../../utils/ConstructFullPath";

export class Router {
    private readonly _routes: Route[];
    private readonly _middlewares: Middleware[];

    constructor(middlewares: Middleware[] = []) {
        this._routes = [];
        this._middlewares = middlewares;
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
        });
    }

    get(path: string, controller: Controller, middlewares: Middleware[] = []) {
        this.useController(path, ['GET'], controller, middlewares);
    }

    post(path: string, controller: Controller, middlewares: Middleware[] = []) {
        this.useController(path, ['POST'], controller, middlewares);
    }

    group(prefix: string, middlewares: Middleware[], callback: (router: Router) => void) {
        const tempRouter = new Router([...this._middlewares, ...middlewares]);
        callback(tempRouter);

        tempRouter.routes.forEach(route => {
            const fullPath = constructFullPath(prefix, route.path);
            this.useController(fullPath, route.methods, route.controller, route.middlewares);
        });
    }
}