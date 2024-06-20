import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {parse} from 'querystring';

export function jsonResponse<T extends Record<string, unknown>>(res: Response, code: number, data: T) {
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
}

export function textResponse(res: Response, code: number, data: string) {
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.end(data);
}

export function htmlResponse(res: Response, code: number, data: string) {
    res.writeHead(code, {'Content-Type': 'text/html'});
    res.end(data);
}

export type Json<T = unknown> = Record<string, T>;

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface Request {
    method: Methods
    url: string
    headers: Record<string, string | string[] | undefined>
    json?: Json
    query?: Json<string>
}

export interface Response extends ServerResponse {
}

export type RouteFn = (req: Request, res: Response) => void;

interface Route {
    handler: RouteFn
    middlewares?: MiddlewareFn[]
    method: string
}

export type MiddlewareFn = (req: Request, res: Response, next: () => void) => void;

export class Router {
    public readonly routes: Map<string, Route>;

    constructor() {
        this.routes = new Map();
    }

    post(path: string, handler: RouteFn, middlewares?: MiddlewareFn[]) {
        this.routes.set(path, {handler, method: 'POST', middlewares});
    }
}

export interface CorsOptions {
    origin: string
    methods: string[]
    allowedHeaders: string[]
    exposedHeaders: string[]
    credentials: boolean
}

const defaultCorsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: false
}

export interface EnigmaConfig {
    serverName: string,
    cors?: CorsOptions
}

interface Cors {
    'Access-Control-Allow-Origin': string
    'Access-Control-Allow-Methods': string
    'Access-Control-Allow-Headers': string
    'Access-Control-Expose-Headers': string
    'Access-Control-Allow-Credentials': string
}

export class Enigma {
    private routes: Map<string, Route>;
    private server: Server<typeof IncomingMessage, typeof ServerResponse>

    private corsOptions: CorsOptions;
    private readonly corsHeaders: Cors

    private generateCorsHeaders() {
        return {
            'Access-Control-Allow-Origin': this.corsOptions.origin,
            'Access-Control-Allow-Methods': this.corsOptions.methods.join(','),
            'Access-Control-Allow-Headers': this.corsOptions.allowedHeaders.join(','),
            'Access-Control-Expose-Headers': this.corsOptions.exposedHeaders.join(','),
            'Access-Control-Allow-Credentials': this.corsOptions.credentials.toString()
        }
    }

    private applyCorsHeaders(res: ServerResponse) {
        res.appendHeader('Access-Control-Allow-Origin', this.corsHeaders['Access-Control-Allow-Origin']);
        res.appendHeader('Access-Control-Allow-Methods', this.corsHeaders['Access-Control-Allow-Methods']);
        res.appendHeader('Access-Control-Allow-Headers', this.corsHeaders['Access-Control-Allow-Headers']);
        res.appendHeader('Access-Control-Expose-Headers', this.corsHeaders['Access-Control-Expose-Headers']);
        res.appendHeader('Access-Control-Allow-Credentials', this.corsHeaders['Access-Control-Allow-Credentials']);
    }

    constructor(config: EnigmaConfig) {
        this.corsOptions = config.cors || defaultCorsOptions;
        this.corsHeaders = this.generateCorsHeaders();

        this.routes = new Map();

        this.server = createServer((req, res) => {
            if (!req.method)
                return jsonResponse(res, 400, {message: 'Bad Request'});

            if (!req.url)
                return jsonResponse(res, 400, {message: 'Bad Request'});

            const splitUrl = req.url.split('?');

            const url = splitUrl[0];
            const queryParams: string | number = splitUrl[1];

            const route = this.routes.get(url);

            if (!route)
                return jsonResponse(res, 404, {message: 'Not Found'});

            let json: Json | undefined = undefined;
            let query: Json<string> | undefined = undefined;

            if (req.headers['content-type'] && req.headers['content-type'] === 'application/json') {
                let data = '';
                req.on('data', chunk => {
                    data += chunk;
                });
                req.on('end', () => {
                    json = JSON.parse(data);
                });
            }

            if (queryParams)
                query = parse(queryParams) as Json<string>;

            const request: Request = {
                method: req.method as Methods,
                url: req.url,
                headers: req.headers,
                json,
                query
            }

            this.applyCorsHeaders(res);
            res.appendHeader('Server', config.serverName);

            if (route.middlewares) {
                let i = 0;
                const next = () => {
                    if (i < route.middlewares!.length)
                        route.middlewares![i++](request, res, next);
                    else
                        return route.handler(request, res);

                }
                return next();
            }

            return route.handler(request, res);
        });
    }

    listen(port: number, callback?: () => void) {
        this.server.listen(port, callback);
    }

    startup(callback: () => void) {
        this.server.on('listening', callback);
    }

    shutdown(callback: () => void) {
        this.server.on('close', callback);
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