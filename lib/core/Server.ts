import {serve, Server} from "bun";
import {Router} from "./Router";
import {HttpContext} from "./HttpContext";
import {EnigmaConfig, Json, Method, Route} from "./Types";
import {serializeEnigmaResponse} from "./Response";

export class Enigma {
    private readonly routes: Map<string, Route>;
    private readonly _config: EnigmaConfig;

    constructor(config: EnigmaConfig) {
        this.routes = new Map();
        this._config = config;
    }

    public use(path: string, router: Router) {
        for (const route of router.routes) {
            const fullPath = path === '/' || path === '' ? route.path : route.path === '/' ? path : `${path}${route.path}`;
            this.routes.set(fullPath, route);
        }
    }

    public listen(cb?: (server: Server) => void) {
        const routes = this.routes;

        const server = serve({
            ...this._config,
            async fetch(req, server): Promise<Response> {
                const url = new URL(req.url);
                const route = routes.get(url.pathname);

                if (!route)
                    return new Response("Not found", {status: 404});

                if (!route.methods.includes(req.method as Method))
                    return new Response("Method not allowed", {status: 405});
                
                let json: Json | undefined;
                if (req.method !== 'GET' && req.headers.get('content-type') === 'application/json')
                    json = await req.json() as Json;

                const ctx = new HttpContext(req, {
                    body: "Internal server error",
                    headers: new Headers({"Content-Type": "text/plain"}),
                    statusCode: 500
                }, server, json);

                if (!route.middlewares || route.middlewares.length === 0)
                    await route.controller.handle(ctx);
                else {
                    let nextIndex = 0;
                    const next = async (): Promise<void> => {
                        if (nextIndex < route.middlewares.length) {
                            await route.middlewares[nextIndex++].handle(ctx, next);
                        } else {
                            await route.controller.handle(ctx);
                        }
                    };
                    await next();
                }

                if (!ctx.response)
                    return new Response("Internal server error", {status: 500});

                return serializeEnigmaResponse(ctx.response);
            }
        });

        if (cb) cb(server);

        return server;
    }
}