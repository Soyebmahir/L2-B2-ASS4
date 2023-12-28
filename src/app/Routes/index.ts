import { CategoryRoutes } from "../modules/category/categroy.route";
import { CourseRoutes, CourseRoutes2, } from "../modules/course/course.route";
import express from 'express'
import { ReviewRoutes } from "../modules/review/review.Route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/course',
        route: CourseRoutes2
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    },
]

moduleRoutes.forEach(routes => {
    router.use(routes.path, routes.route)
})
export default router;