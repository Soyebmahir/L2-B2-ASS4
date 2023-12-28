import { Router } from 'express';
import {
    changePasswordController,
    createUserController,
    loginUserController,
} from './user.controller';
// import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import auth from '../../middleware/auth';

const router = Router();

router.route('/register').post(createUserController);

router.route('/login').post(loginUserController);

router
    .route('/change-password')
    .post(auth(USER_ROLE.user, USER_ROLE.admin), changePasswordController);

export const UserRoutes = router;
