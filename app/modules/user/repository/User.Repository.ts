import {Repository, RepositoryConfig} from "../../../../lib/core/Repository";
import {userTable} from "./User.Table";
import {eq, InferInsertModel} from "drizzle-orm";
import {Cache} from "../../../../lib/core/Cache";
import {UserModel} from "./User.Model";

export class UserRepository extends Repository<typeof userTable> {
    constructor(
        config: RepositoryConfig<typeof userTable>,
        private readonly cache: Cache
    ) {
        super(config);
    }

    async findByEmail(email: string) {
        const res = await this.cache.cacheIt(`user:${email}`, 60, async () => {
            const res = await this.db.select().from(userTable).where(eq(userTable.email, email))
            if (!res || res.length === 0)
                return null
            return res[0]
        })
        if (!res)
            return null
        return JSON.parse(res) as UserModel
    }

    create(model: InferInsertModel<typeof userTable>) {
        return this.db.insert(userTable).values(model)
    }
}