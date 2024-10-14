import {LoggerMiddleware} from "./Logger.Middleware";
import {logger} from "../../../../start/Logger";
import {CorsMiddleware} from "./Cors.Middleware";
import {RateLimitMiddleware} from "./RateLimit.Middleware";
import {cache} from "../../../../start/Cache";
import {SetIPMiddleware} from "./SetIP.Middleware";
import {ErrorHandlerMiddleware} from "./ErrorHandler.Middleware";
import {PerformanceMiddleware} from "./Performance.Middleware";

export const loggerMiddleware = new LoggerMiddleware(logger)
export const errorHandlerMiddleware = new ErrorHandlerMiddleware(logger)
export const corsMiddleware = new CorsMiddleware()
export const rateLimitMiddleware = new RateLimitMiddleware(cache)
export const setIPMiddleware = new SetIPMiddleware()
export const performanceMiddleware = new PerformanceMiddleware()