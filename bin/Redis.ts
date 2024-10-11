import {Cache} from "../lib/core/Cache";
import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from "redis";
import {CacheTypes} from "../lib/core/Types";

export class Redis extends Cache {
    private client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> | undefined

    constructor() {
        super();
    }

    async connect() {
        this.client = await createClient()
            .on('error', err => {
                throw err
            })
            .connect()
    }

    async set(key: string, value: CacheTypes, expiresIn: number = 60) {
        if (!this.client)
            throw new Error('Redis client not connected');

        let parsedValue: string;

        if (typeof value === 'object')
            parsedValue = JSON.stringify(value);
        else
            parsedValue = value.toString();

        await this.client.set(key, parsedValue, {
            EX: expiresIn
        });
    }

    async get(key: string) {
        if (!this.client)
            throw new Error('Redis client not connected');

        return await this.client.get(key);
    }
}