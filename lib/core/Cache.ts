type CacheTypes = string | object

export abstract class Cache {
    abstract set(key: string, value: CacheTypes): Promise<void>

    abstract get<T>(key: string): Promise<T>

    async cacheIt<T extends CacheTypes>(key: string, fn: () => T | Promise<T>): Promise<T> {
        const value = await this.get<T>(key);
        if (!value)
            await this.set(key, await fn());
        return value
    }
}