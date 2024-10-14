import {Controller} from "../../../../../lib/core/Controller";
import {HttpContext} from "../../../../../lib/core/HttpContext";
import {textResponse} from "../../../../../lib/core/Response";
import {existsSync, readFileSync} from 'node:fs';

export class OpenAPIController extends Controller {
    constructor() {
        super();
    }

    private readFile(path: string): string {
        if (existsSync(path)) return readFileSync(path).toString();
        throw new Error('File not found');
    }

    handle(ctx: HttpContext) {
        let res;

        try {
            res = this.readFile('openapi.json');
        } catch (e) {
            return textResponse(ctx, 404, 'OpenAPI schema not found');
        }

        return textResponse(ctx, 200, res)
    }
}