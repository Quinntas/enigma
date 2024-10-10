import {Router} from "../lib/core/Router";
import {bodyParserMiddleware, corsMiddleware, loggerMiddleware} from "../app/modules/shared/middlewares";
import {healthCheckController} from "../app/modules/shared/controllers";
import {createUserController} from "../app/modules/user/controllers/CreateUser";

export const router = new Router();

router.useMiddleware(corsMiddleware)
router.useMiddleware(loggerMiddleware)
router.useMiddleware(bodyParserMiddleware)

router.get('/', healthCheckController);

router.group('/users', [], userRouter => {
    userRouter.post('/', createUserController)
})
