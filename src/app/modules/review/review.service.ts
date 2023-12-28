import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";
import Course from "../course/course.model";

const createCourseIntoDb = async (userData: JwtPayload, payload: TReview) => {
    const { courseId } = payload;
    if (courseId) {
        await Course.isCourseExists(courseId);
    }

    payload.createdBy = userData._id;

    const newReview = await ReviewModel.create(payload);


    const result = await ReviewModel.aggregate([
        {
            $match: { _id: newReview._id }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
            },
        },
        {
            $unwind: '$createdBy'
        },
        {
            $project: { 'createdBy.password': 0, 'createdBy.createdAt': 0, 'createdBy.updatedAt': 0, 'createdBy.previousLastPassword': 0, 'createdBy.previousSecondLastPassword': 0, 'createdBy.__v': 0, '__v': 0 }
        }
    ])


    return result;
};
const getAllReviews = async () => {
    const result = await ReviewModel.find()
    return result;
}

export const ReviewServices = {
    createCourseIntoDb,
    getAllReviews
}