import { z } from 'zod';

export const userValidationSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: 'username is required.',
            invalid_type_error: 'username must be a string.',
        }),
        email: z.string({
            required_error: 'email is required.',
            invalid_type_error: 'email must be a string.',
        }),
        password: z.string({
            required_error: 'password is required.',
            invalid_type_error: 'password must be a string.',
        }),
        passwordChangedAt: z.string({
            invalid_type_error: 'passwordChangedAt must be a string.',
        }).datetime().optional(),
        role: z.enum(['admin', 'user'], {
            invalid_type_error: 'role must be either "admin" or "user".',
        }).optional(),
    }),
});




