import {defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./bin/DatabaseSchema.ts",
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
});