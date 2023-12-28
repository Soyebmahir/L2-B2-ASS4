import express from 'express'

import validateRequest from '../../middleware/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryController } from './categroy.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();


router.post('/', auth(USER_ROLE.admin), validateRequest(CategoryValidations.CategoryValidationSchema), CategoryController.createCategory)
router.get('/', CategoryController.getAllCategories)



export const CategoryRoutes = router
