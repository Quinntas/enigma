import {Repository, RepositoryConfig} from "../../../../lib/core/Repository";
import {userTable} from "./User.Table";
import {eq, InferInsertModel} from "drizzle-orm";

export class UserRepository extends Repository<typeof userTable> {
    constructor(
        config: RepositoryConfig<typeof userTable>
    ) {
        super(config);
    }

    findByEmail(email: string) {
        return this.db.select().from(userTable).where(eq(userTable.email, email))
    }

    create(model: InferInsertModel<typeof userTable>) {
        return this.db.insert(userTable).values(model)
    }
}