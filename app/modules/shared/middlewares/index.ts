import {LoggerMiddleware} from "./Logger.Middleware";
import {logger} from "../../../../start/Logger";
import {BodyParserMiddleware} from "./BodyParser.Middleware";
import {CorsMiddleware} from "./Cors.Middleware";

export const loggerMiddleware = new LoggerMiddleware(logger)
export const bodyParserMiddleware = new BodyParserMiddleware(logger)
export const corsMiddleware = new CorsMiddleware(logger)