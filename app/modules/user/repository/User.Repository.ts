import {Repository, RepositoryConfig} from "../../../../lib/core/Repository";
import {userTable} from "./User.Table";
import {eq, InferInsertModel} from "drizzle-orm";
import {Cache} from "../../../../lib/core/Cache";

export class UserRepository extends Repository<typeof userTable> {
    constructor(
        config: RepositoryConfig<typeof userTable>,
        private readonly cache: Cache
    ) {
        super(config);
    }

    findByEmail(email: string) {
        return this.cache.cacheIt(`user:${email}`, async () =>
            await this.db.select().from(userTable).where(eq(userTable.email, email)))
    }

    create(model: InferInsertModel<typeof userTable>) {
        return this.db.insert(userTable).values(model)
    }
}