import {Serve, serve, Server} from "bun"


export interface Request extends globalThis.Request {
}

export interface Response extends globalThis.Response {
}

export type RouteFn = (req: Request, server: Server) => Promise<Response> | Response;

interface Route {
    handler: RouteFn
    middlewares?: MiddlewareFn[]
    method: string
}

export type NextFn = () => void;

export type MiddlewareFn = (req: Request, server: Server, next: NextFn) => void;

export class Router {
    public readonly routes: Map<string, Route>;

    constructor() {
        this.routes = new Map();
    }

    post(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'POST', middlewares});
    }

    get(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'GET', middlewares});
    }

    put(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'PUT', middlewares});
    }

    delete(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'DELETE', middlewares});
    }

    patch(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'PATCH', middlewares});
    }

    options(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'OPTIONS', middlewares});
    }

    head(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'HEAD', middlewares});
    }
}

export type EnigmaConfig = {
    startup?: () => void
    port?: number
    hostname?: string
    defaultResponses?: {
        notFound?: Response
        methodNotAllowed?: Response
    }
} & Omit<Serve<unknown>, 'fetch'>

export class Enigma {
    private readonly routes: Map<string, Route>;
    private readonly config: EnigmaConfig;

    private readonly defaultNotFoundResponse = new Response(
        JSON.stringify({message: "Method not allowed"}), {
            status: 405,
            headers: {'Content-Type': 'application/json'}
        }
    )

    private readonly defaultMethodNotAllowedResponse = new Response(
        JSON.stringify({message: "Method not allowed"}), {
            status: 405,
            headers: {'Content-Type': 'application/json'}
        }
    )

    constructor(config: EnigmaConfig) {
        this.routes = new Map();
        this.config = config;
    }

    private getResponse(key: string, defaultResponse: Response): Response {
        return this.config.defaultResponses && (this.config.defaultResponses as Record<string, Response>)[key]
            ? (this.config.defaultResponses as Record<string, Response>)[key] : defaultResponse;
    }

    listen() {
        const routes = this.routes;

        const notFound = this.getResponse('notFound', this.defaultNotFoundResponse);
        const methodNotAllowed = this.getResponse('methodNotAllowed', this.defaultMethodNotAllowedResponse);

        const server = serve({
            ...this.config,
            async fetch(req, server) {
                const url = new URL(req.url);

                const route = routes.get(url.pathname);

                if (!route)
                    return notFound;

                if (route.method !== req.method)
                    return methodNotAllowed;

                if (!route.middlewares || route.middlewares.length === 0)
                    return route.handler(req, server)

                let i = 0;

                const next = () => {
                    if (i < route.middlewares!.length)
                        route.middlewares![i++](req, server, next);
                    else
                        return route.handler(req, server);
                    return new Response
                }

                return next();
            }
        })

        if (this.config.startup)
            this.config.startup();

        return server
    }

    use(path: string, router: Router) {
        router.routes.forEach((route, key) => {
            if (path === '/' || path === '')
                this.routes.set(key, route);
            else
                this.routes.set(`${path}${key}`, route);
        });
    }
}