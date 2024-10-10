import {Serve} from "bun";
import {Controller} from "./Controller";
import {Middleware} from "./Middleware";

export interface Request extends globalThis.Request {
}

export interface Response extends globalThis.Response {
}

export type NextFn = () => void;

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