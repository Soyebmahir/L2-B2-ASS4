
import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';


import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { CourseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = Router();
const router2 = Router();

router
    .route('/')
    .post(
        auth(USER_ROLE.admin),
        validateRequest(CourseValidations.courseValidationSchema),
        CourseController.createCourse,
    )
    .get(CourseController.getAllCourse);
router
    .route('/:courseId')
    .put(auth(USER_ROLE.admin), validateRequest(CourseValidations.updateCourseValidationSchema), CourseController.updateCourse);

router.route('/:courseId/reviews').get(CourseController.getBestCourseWithReviewAverage);



export const CourseRoutes = router;

router2.route('/best').get(CourseController.getBestCourseWithReviewAverage);


export const CourseRoutes2 = router2;



























// import express from 'express'
// import { CourseController } from './course.controller';
// import validateRequest from '../../middleware/validateRequest';
// import { CourseValidations } from './course.validation';

// const router1 = express.Router();
// const router2 = express.Router();

// router1.post('/',
//     validateRequest(CourseValidations.courseValidationSchema),
//     CourseController.createCourse)
// router1.get('/best', CourseController.getBestCourseWithReviewAverage)

// router2.get('/', CourseController.getAllCourse)
// router2.put('/:courseId', validateRequest(CourseValidations.updateCourseValidationSchema), CourseController.updateCourse)
// router2.get('/:courseId/reviews', CourseController.getSingleCourseWithReviews)

// export const CoursePostRoute = router1
// export const CourseRoute = router2