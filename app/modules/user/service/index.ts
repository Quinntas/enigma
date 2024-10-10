import {UserService} from "./User.Service";
import {logger} from "../../../../start/Logger";
import {userRepository} from "../repository";

export const userService = new UserService(
    logger,
    userRepository
)