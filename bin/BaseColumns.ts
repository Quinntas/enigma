import {serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {UUIDv4} from "../utils/UUID";

export const baseColumns = {
    id: serial('id').primaryKey(),
    pid: varchar('pid', {length: 191})
        .notNull()
        .$defaultFn(() => UUIDv4()),
    createdAt: timestamp('created_at', {mode: "date"})
        .notNull()
        .defaultNow(),
};