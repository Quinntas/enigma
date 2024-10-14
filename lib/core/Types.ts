import * as bun from "bun";
import {Serve} from "bun";
import {Controller} from "./Controller";
import {Middleware} from "./Middleware";

export interface Request extends globalThis.Request {
}

export interface Response {
    statusCode: number
    headers: globalThis.Response['headers']
    body: any
}

export type CacheTypes = string | object | number

export type NextFn = () => Promise<void>;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

export type EnigmaConfig = {
    hostname?: string
    port: number
} & Omit<Serve<unknown>, 'fetch'>

export interface Route {
    path: string;
    methods: Method[];
    controller: Controller;
    middlewares: Middleware[]
}

export type Json = {
    [key: string]: unknown
}

export type SocketAddress = bun.SocketAddress