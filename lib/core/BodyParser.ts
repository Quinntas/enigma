import {z} from "zod";

export function bodyParser<Schema extends z.ZodObject<any>, T = unknown>(schema: Schema, body: T): z.infer<Schema> {
    return schema.parse(body);
}