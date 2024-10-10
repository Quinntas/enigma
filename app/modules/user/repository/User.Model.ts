import {InferSelectModel} from 'drizzle-orm'
import {userTable} from "./User.Table";

export type UserModel = InferSelectModel<typeof userTable> & {};
