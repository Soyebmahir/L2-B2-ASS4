import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface"
import { Category } from "./category.model"

const createCategoryIntoDb = async (userData: JwtPayload, payload: TCategory) => {

    payload.createdBy = userData._id;
    const result = await Category.create(payload);
    return result;
};
const getAllCategoriesFromDb = async () => {
    const result = await Category.aggregate([
        {
            $match: {}
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
    ]);
    return { categories: result };
};

export const CategoryServices = {
    createCategoryIntoDb,
    getAllCategoriesFromDb
}