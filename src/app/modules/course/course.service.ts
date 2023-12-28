/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { ReviewModel } from "../review/review.model";
import { Category } from "../category/category.model";
import { JwtPayload } from "jsonwebtoken";


const createCourseIntoDb = async (userData: JwtPayload, payload: TCourse) => {

    if (!(await Category.isCategoryExist(payload.categoryId as unknown as string))) {
        if (24 !== (payload.categoryId as unknown as string).length) {
            throw new AppError(httpStatus.BAD_REQUEST, `${payload.categoryId}, Category Id should be 24 character`)
        } else {
            throw new AppError(httpStatus.BAD_REQUEST, `${payload.categoryId}, Category with this Id Doesnt exist`)
        }

    }
    payload.createdBy = userData._id;
    const result = await Course.create(payload)
    const { _doc } = result as any;

    const { reviewIds, ...rest } = _doc;

    return rest;

}

//No.2
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const sortFields = ["title", "price", "startDate", " endDate", "language", "durationInWeeks"]

    const page = query?.page ? parseInt(query.page as string) : 1;
    const limit = query?.limit ? parseInt(query.limit as string) : 10;


    let sortBy = query?.sortBy || 'createdAt';
    if (!sortFields.includes(sortBy as string)) {
        // If not, default to 'createdAt'
        sortBy = 'createdAt';
    }
    const sortOrder = query?.sortOrder && (query.sortOrder as string).toLowerCase() as string === 'desc' ? -1 : 1;

    const filter: Record<string, any> = {};

    if (query?.minPrice) {
        filter.price = { $gte: parseFloat(query.minPrice as string) };
    }

    if (query?.maxPrice) {
        filter.price = { ...filter.price, $lte: parseFloat(query.maxPrice as string) };
    }

    if (query?.tags) {
        filter['tags.name'] = query.tags;
    }

    if (query?.startDate) {
        filter.startDate = { $gte: new Date(query.startDate as string) };
    }

    if (query?.endDate) {
        filter.endDate = { $lte: new Date(query.endDate as string) };
    }

    if (query?.language) {
        filter.language = query.language;
    }

    if (query?.provider) {
        filter.provider = query.provider;
    }

    if (query?.durationInWeeks) {
        filter.durationInWeeks = parseInt(query.durationInWeeks as string);
    }

    if (query?.level) {
        filter['details.level'] = query.level;
    }



    const result = await Course.aggregate([
        {
            $facet: {
                courses: [
                    {
                        $match: filter,
                    },
                    {
                        $sort: { [sortBy as string]: sortOrder },
                    },
                    {
                        $skip: (page - 1) * limit,
                    },
                    {
                        $limit: limit,
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
                        $project: { 'createdBy.password': 0, 'createdBy.createdAt': 0, 'createdBy.updatedAt': 0, 'createdBy.previousLastPassword': 0, 'createdBy.previousSecondLastPassword': 0, 'createdBy.__v': 0 }
                    }
                ],
                total: [
                    {
                        $match: filter,
                    },
                    { $count: 'total' },
                ],
            },
        },
    ]);
    return {
        courses: result?.[0]?.courses,
        meta: {
            page,
            limit,
            total: result?.[0]?.total?.[0]?.total,
        },
    };

}

//No.6
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {


    const { tags, details, startDate, endDate, ...remainingInfo } = payload;


    const session = await mongoose.startSession()

    try {
        session.startTransaction();
        const modifiedUpdateData: Record<string, unknown> = { ...remainingInfo }
        if (details && Object.keys(details).length) {
            for (const [key, value] of Object.entries(details)) {
                modifiedUpdateData[`details.${key}`] = value
            }
        }
        const basicCourseInfoUpdate = await Course.findByIdAndUpdate(id, modifiedUpdateData, {
            new: true,
            runValidators: true,
            session
        })
        if (!basicCourseInfoUpdate) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course')
        }
        // console.log();
        if (startDate || endDate) {
            // Update startDate, endDate, and recalculate durationInWeeks

            const updatedCourse = await Course.findByIdAndUpdate(id, {
                startDate: startDate || basicCourseInfoUpdate.startDate,
                endDate: endDate || basicCourseInfoUpdate.endDate,
            }, {
                new: true,
                runValidators: true,
                session
            });
            if (updatedCourse) {
                const startDateToUpdate = updatedCourse.startDate;
                const endDateToUpdate = updatedCourse.endDate;

                const durationInWeeks = Math.ceil((new Date(endDateToUpdate).getTime() - new Date(startDateToUpdate).getTime()) / (7 * 24 * 60 * 60 * 1000));

                // Update durationInWeeks
                await Course.findByIdAndUpdate(id, { durationInWeeks }, {
                    new: true,
                    runValidators: true,
                    session
                });
            }

        }

        if (tags && tags.length > 0) {
            const deleteTags = tags?.filter(el => el.name && el.isDeleted).map(el => el.name)
            const deletedTags = await Course.findByIdAndUpdate(id, {
                $pull: { tags: { name: { $in: deleteTags } } }
            }, {
                new: true,
                runValidators: true,
                session
            })

            if (!deletedTags) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Tags ')
            }

            const newTagsForCourse = tags.filter(el => el.name && !el.isDeleted)
            const addedTagsIntoCourse = await Course.findByIdAndUpdate(id, {
                $addToSet: {
                    tags: {
                        $each: newTagsForCourse
                    }
                }
            },
                {
                    new: true,
                    runValidators: true,
                    session
                })
            if (!addedTagsIntoCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed To add new Tags')
            }
        }


        // const result = await Course.findById(id)
        await session.commitTransaction()
        await session.endSession()
        const result = await Course.findById(id).populate('createdBy')
        return result


    } catch (error: any) {
        console.log(error);
        await session.abortTransaction()
        await session.endSession()

        throw new AppError(httpStatus.BAD_REQUEST, error.message);


    }


}


const getSingleCourseWithReviewsFromDB = async (courseId: string) => {
    const course = await Course.findById(courseId).select(
        "-createdAt -updatedAt -__v",
    );
    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, "Course Not Exits!!!");
    }
    const reviews = await ReviewModel.find({ courseId: course._id }).populate('createdBy').select('-_id -__v');
    return {
        course,
        reviews,
    };
};

const getBestCourseWithReviewAverageFromDB = async () => {
    const result = await ReviewModel.aggregate([
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 },
            },
        },
        { $sort: { averageRating: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course',
            }
        },
        {
            $unwind: '$course'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'course.createdBy',
                foreignField: '_id',
                as: 'course.createdBy',
            }
        },
        {
            $unwind: '$course.createdBy'
        },
        {
            $project: { 'course.createdBy.password': 0, 'course.createdBy.createdAt': 0, 'course.createdBy.updatedAt': 0, 'course.createdBy.previousLastPassword': 0, 'course.createdBy.previousSecondLastPassword': 0, 'course.createdBy.__v': 0, '__v': 0 }
        },


        {
            $project: { _id: 0 },
        },
    ]);

    // const course = bestCourse[0];
    // return {
    //     course: course.course[0],
    //     averageRating: course.averageRating,
    //     reviewCount: course.reviewCount,
    // };
    if (!result.length) {
        return result;
    }

    return result[0];

};

export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDB,
    updateCourseIntoDB,
    getSingleCourseWithReviewsFromDB,
    getBestCourseWithReviewAverageFromDB
}