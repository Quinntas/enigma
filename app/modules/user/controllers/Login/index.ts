import {LoginController} from "./Login.Controller";
import {userService} from "../../service";

export const loginController = new LoginController(userService)

