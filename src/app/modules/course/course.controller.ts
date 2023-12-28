import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDb(req.user, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course Created Successfully',
        data: result

    })
})
const getAllCourse = catchAsync(async (req, res) => {

    const result = await CourseServices.getAllCourseFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Found Successfully',
        data: result
    })
})


const updateCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.updateCourseIntoDB(req.params.courseId, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Updated Successfully',
        data: result
    })
})

const getSingleCourseWithReviews = catchAsync(async (req, res) => {
    // console.log(req.params.courseId);
    const result = await CourseServices.getSingleCourseWithReviewsFromDB(req.params.courseId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Found With Reviews Successfully',
        data: result
    })
})
const getBestCourseWithReviewAverage = catchAsync(async (req, res) => {
    const result = await CourseServices.getBestCourseWithReviewAverageFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Best Course Found With Average Reviews and Count Successfully',
        data: result
    })
})
export const CourseController = {
    createCourse,
    getAllCourse,
    updateCourse,
    getSingleCourseWithReviews,
    getBestCourseWithReviewAverage
}