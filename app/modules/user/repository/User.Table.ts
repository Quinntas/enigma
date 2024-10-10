import {pgTable, varchar} from "drizzle-orm/pg-core";
import {baseColumns} from "../../../../bin/BaseColumns";

export const userTable = pgTable('users', {
    ...baseColumns,
    email: varchar('email', {length: 255}).notNull().unique(),
    password: varchar('password', {length: 255}).notNull(),
})