import {Router} from "../lib/core/Router";
import {createUserController} from "../app/modules/user/controllers";
import {loggerMiddleware} from "../app/modules/shared/middlewares";
import {healthCheckController} from "../app/modules/shared/controllers";

export const router = new Router();

router.useMiddleware(loggerMiddleware)

router.get('/', healthCheckController);

router.post('/users', createUserController)


