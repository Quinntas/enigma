import {CacheTypes} from "./Types";

export abstract class Cache {
    abstract set(key: string, value: CacheTypes, expiresIn: number): Promise<void>

    abstract get(key: string): Promise<string | null>

    async cacheIt<T extends CacheTypes>(key: string, expiresIn: number, fn: () => T | Promise<T>) {
        const value = await this.get(key);
        if (!value)
            await this.set(key, await fn(), expiresIn);
        return value
    }
}