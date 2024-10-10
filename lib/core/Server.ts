import {serve, Server} from "bun";
import {Router} from "./Router";
import {HttpContext} from "./HttpContext";
import {EnigmaConfig, Json, Method, Route} from "./Types";

export class Enigma {
    private readonly routes: Map<string, Route>;
    private readonly _config: EnigmaConfig

    constructor(config: EnigmaConfig) {
        this.routes = new Map();
        this._config = config;
    }

    public use(path: string, router: Router) {
        for (const route of router.routes) {
            if (path === '/' || path === '')
                this.routes.set(route.path, route);
            else if (route.path === '/')
                this.routes.set(path, route);
            else
                this.routes.set(`${path}${route.path}`, route);
        }
    }

    public listen(cb?: (server: Server) => void) {
        const routes = this.routes;

        const server = serve({
            ...this._config,
            async fetch(req, server) {
                const url = new URL(req.url);

                const route = routes.get(url.pathname);

                if (!route) {
                    return new Response("Not found", {
                        status: 404
                    });
                }

                if (!route.methods.includes(req.method as Method))
                    return new Response("Method not allowed", {
                        status: 405
                    });

                let json;

                if (req.method !== 'GET' && req.headers.get('content-type') === 'application/json')
                    json = await req.json();

                let ctx = new HttpContext(req, server, json as Json);

                if (!route.middlewares || route.middlewares.length === 0)
                    return route.controller.handle(ctx);

                let nextIndex = 0;

                const next = (): Response | Promise<Response> => {
                    if (nextIndex < route.middlewares.length)
                        route.middlewares[nextIndex++].handle(ctx, next);
                    return route.controller.handle(ctx);
                };

                return next();
            }
        });

        if (cb) cb(server);

        return server;
    }
}