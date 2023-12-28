import express from 'express'


import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';




const router = express.Router();


router.post('/', auth(USER_ROLE.user),
    validateRequest(ReviewValidation.reviewValidationSchema),
    ReviewController.createReview)
router.get('/', ReviewController.getAllReviews)



export const ReviewRoutes = router
