import {PgDatabase, PgTable} from "drizzle-orm/pg-core";

export interface RepositoryConfig<Table extends PgTable> {
    db: PgDatabase<any>;
    table: Table;
}

export abstract class Repository<Table extends PgTable> {
    protected constructor(
        private readonly config: RepositoryConfig<Table>
    ) {
    }

    get db() {
        return this.config.db;
    }

    get table() {
        return this.config.table;
    }
}