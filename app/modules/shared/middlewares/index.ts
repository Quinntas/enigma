import {LoggerMiddleware} from "./Logger.Middleware";
import {logger} from "../../../../start/Logger";

export const loggerMiddleware = new LoggerMiddleware(logger)