import { Model, Types } from "mongoose"

export type TCategory = {
    name: string;
    createdBy: Types.ObjectId;
}

export interface CategoryModel extends Model<TCategory> {
    isCategoryExist(id: string): Promise<TCategory | null>
}