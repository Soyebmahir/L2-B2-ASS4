/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Types, model } from "mongoose";
import { ICourseStatic, TCourse, TDetailsObject, TTagsObject } from "./course.interface";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";

const tagsSchema = new Schema<TTagsObject>({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    _id: false
});

const detailsSchema = new Schema<TDetailsObject>({
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// interface TCourseDocument extends Document, TCourse { }

const courseSchema = new Schema<TCourse, ICourseStatic>({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [tagsSchema],
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: {
        type: Number,

    },
    details: {
        type: detailsSchema,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
courseSchema.pre('save', function (next) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);


    const durationInWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));


    this.durationInWeeks = durationInWeeks;

    next();
});

courseSchema.statics.isCategoryExist = async function (id: string) {
    const existingCategory = await Course.findOne({ id })
    return existingCategory;
}
courseSchema.statics.isCourseExists = async (_id: Types.ObjectId) => {
    const isExists = await Course.findById(_id);

    if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, `${_id} is not a valid ID`);
    }
};

const Course = model<TCourse, ICourseStatic>('Course', courseSchema);

export default Course;