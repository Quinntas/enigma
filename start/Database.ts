import env from "./Env";
import {Pool} from "pg";
import {drizzle} from "drizzle-orm/node-postgres";

export const db = drizzle(new Pool({
    connectionString: env.POSTGRES_URL
}));

