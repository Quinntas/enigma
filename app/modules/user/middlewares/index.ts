import {EnsureAuthenticatedMiddleware} from "./EnsureAuthenticated.Middleware";
import {logger} from "../../../../start/Logger";
import {userRepository} from "../repository";

export const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(logger, userRepository)