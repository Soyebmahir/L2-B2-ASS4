/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
    [x: string]: any;
    username: string;
    email: string;
    password: string;
    previousLastPassword?: string;
    previousSecondLastPassword?: string;
    passwordChangedAt?: Date;
    role: 'admin' | 'user';
}

export interface UserModel extends Model<TUser> {
    isUserExistsByUsername(username: string): Promise<TUser>;
    isUserExistsWithPassword(username: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserLogin = {
    username: string;
    password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
