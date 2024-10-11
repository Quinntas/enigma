import {Cache} from "../lib/core/Cache";

export class Redis extends Cache {
    async set(key: string, value: string | object) {
        throw new Error('Method not implemented.')
    }

    async get<T>(key: string): Promise<T> {
        throw new Error('Method not implemented.')
    }

}