/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser, TUserLogin } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUserservices = async (userData: TUser) => {
    const user = await User.isUserExistsByUsername(userData.username);

    if (user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exist!');
    }

    const newUser = await User.create(userData);

    const { _doc } = newUser as any;
    const { password, __v, ...rest } = _doc;

    return rest;
};

export const loginUserService = async (payload: TUserLogin) => {
    const user = await User.isUserExistsWithPassword(payload.username);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This user is not found !');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }

    const jwtPayload = {
        _id: user?._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    const token = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const { _doc } = user as any;
    const {
        __v,
        createdAt,
        updatedAt,
        password,
        previousLastPassword,
        previousSecondLastPassword,
        passwordChangedAt,
        ...rest
    } = _doc;

    return {
        token,
        user: rest,
    };
};

export const changePasswordService = async (
    userData: JwtPayload,
    payload: { currentPassword: string; newPassword: string },
) => {
    const user = await User.isUserExistsWithPassword(userData.username);

    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, 'This user is not found !');
    }

    if (
        !(await User.isPasswordMatched(payload.currentPassword, user?.password))
    ) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
    }

    if (user?.previousSecondLastPassword) {
        if (
            (await User.isPasswordMatched(
                payload.newPassword,
                user?.previousLastPassword as string,
            )) ||
            (await User.isPasswordMatched(
                payload.newPassword,
                user?.previousSecondLastPassword as string,
            ))
        ) {
            throw new AppError(
                httpStatus.FORBIDDEN,
                'Password change failed. Ensure the new password is unique and not among the last 2 used (last used on 2023-01-01 at 12:00 PM).',
            );
        }
    }


    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_round),
    );

    await User.findByIdAndUpdate(userData._id, {
        password: newHashedPassword,
        previousLastPassword: user?.password,
        previousSecondLastPassword: user?.previousLastPassword,
    });

    const { _doc } = user as any;
    const {
        __v,
        password,
        previousLastPassword,
        previousSecondLastPassword,
        passwordChangedAt,
        ...rest
    } = _doc;

    return rest;
};
