import {LoggerMiddleware} from "./Logger.Middleware";
import {logger} from "../../../../start/Logger";
import {BodyParserMiddleware} from "./BodyParser.Middleware";
import {CorsMiddleware} from "./Cors.Middleware";
import {RateLimitMiddleware} from "./RateLimit.Middleware";
import {cache} from "../../../../start/Cache";

export const loggerMiddleware = new LoggerMiddleware(logger)
export const bodyParserMiddleware = new BodyParserMiddleware()
export const corsMiddleware = new CorsMiddleware()
export const rateLimitMiddleware = new RateLimitMiddleware(cache)