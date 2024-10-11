import {UserService} from "./User.Service";
import {logger} from "../../../../start/Logger";
import {userRepository} from "../repository";
import {cache} from "../../../../start/Cache";

export const userService = new UserService(
    logger,
    userRepository,
    cache
)