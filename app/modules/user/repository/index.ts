import {UserRepository} from "./User.Repository";
import {userTable} from "./User.Table";
import {db} from "../../../../start/Database";
import {cache} from "../../../../start/Cache";

export const userRepository = new UserRepository({
    table: userTable,
    db
}, cache)