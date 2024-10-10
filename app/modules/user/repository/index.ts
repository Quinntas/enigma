import {UserRepository} from "./User.Repository";
import {userTable} from "./User.Table";
import {db} from "../../../../start/Postgres";

export const userRepository = new UserRepository({
    table: userTable,
    db
})