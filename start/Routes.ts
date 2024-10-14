import {Router} from "../lib/core/Router";
import {
    corsMiddleware,
    errorHandlerMiddleware,
    loggerMiddleware,
    performanceMiddleware,
    rateLimitMiddleware,
    setIPMiddleware
} from "../app/modules/shared/middlewares";
import {healthCheckController} from "../app/modules/shared/controllers";
import {createUserController} from "../app/modules/user/controllers/CreateUser";
import {loginController} from "../app/modules/user/controllers/Login";

export const router = new Router();

router.useMiddleware(performanceMiddleware)
router.useMiddleware(errorHandlerMiddleware)
router.useMiddleware(setIPMiddleware)
router.useMiddleware(rateLimitMiddleware)
router.useMiddleware(corsMiddleware)
router.useMiddleware(loggerMiddleware)

router.get('/', healthCheckController);

router.group('/users', [], userRouter => {
    userRouter.post('/', createUserController)
    userRouter.post('/login', loginController)
})
