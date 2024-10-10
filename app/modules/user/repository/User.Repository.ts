import {Repository, RepositoryConfig} from "../../../../lib/core/Repository";
import {userTable} from "./User.Table";
import {InferInsertModel} from "drizzle-orm";

export class UserRepository extends Repository<typeof userTable> {
    constructor(
        config: RepositoryConfig<typeof userTable>
    ) {
        super(config);
    }

    create(model: InferInsertModel<typeof userTable>) {
        return this.db.insert(userTable).values(model)
    }
}