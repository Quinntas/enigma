import {CreateUserController} from "./CreateUser.Controller";
import {userService} from "../service";

export const createUserController = new CreateUserController(userService)