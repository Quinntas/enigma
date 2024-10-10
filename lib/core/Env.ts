import {z} from "zod";

type EnvZodType = z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodEnum<[string, ...string[]]>;

type EnvConfig = Record<string, EnvZodType>;

type EnvObj<T extends EnvConfig> = {
    [K in keyof T]: T[K] extends z.ZodString ? string :
        T[K] extends z.ZodNumber ? number :
            T[K] extends z.ZodBoolean ? boolean :
                T[K] extends z.ZodEnum<[string, ...string[]]> ? z.infer<T[K]> : never;
};

export class Env {
    static readonly schema = {
        string: () => z.string(),
        number: () => z.number(),
        boolean: () => z.boolean(),
        enum: <T extends [string, ...string[]]>(values: T) => z.enum(values),
    };

    static create<T extends EnvConfig>(path: string, env: T): EnvObj<T> {
        const envObj: Partial<EnvObj<T>> = {};

        for (const key in env) {
            const value = process.env[key];

            if (!value)
                throw new Error(`Environment variable ${key} is not set`);


            const EnvType = env[key];
            (envObj as any)[key] = this.parseEnvValue(EnvType, value);
        }

        return envObj as EnvObj<T>;
    }

    private static parseEnvValue<T extends EnvZodType>(EnvType: T, value: string): z.infer<T> {
        try {
            if (EnvType instanceof z.ZodString)
                return EnvType.parse(value);

            else if (EnvType instanceof z.ZodNumber)
                return EnvType.parse(parseInt(value));

            else if (EnvType instanceof z.ZodBoolean)
                return EnvType.parse(value === 'true');

            return EnvType.parse(value);
        } catch (e) {
            throw new Error(`Invalid value for environment variable: ${e}`);
        }
    }
}