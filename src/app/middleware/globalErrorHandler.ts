/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { handleZodError } from "../Errors/handleZodError";
import { handleCastError } from "../Errors/handleCastError";
import { handleDuplicateError } from "../Errors/handleDuplicateError";
import { handleMongooseError } from "../Errors/handleMongooseError";
import config from "../config";
import { TGenericErrorResponse } from "../interface/Error";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // const errorResponse: TGenericErrorResponse = {
    //     success: false,
    //     message: 'Error',
    //     errorMessage: 'Something went wrong',
    //     errorDetails: { err: "Something went wrong'" },
    //     stack: config.NODE_ENV === 'development' ? err?.stack : null,
    //   };

    let statusCode = err.statusCode || 500;

    let message = err.message || 'something Went wrong';
    let errorMessage;
    let errorDetails;


    //error checkup
    if (err instanceof ZodError) {
        const modifiedError = handleZodError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorMessage = modifiedError.errorMessage;
        errorDetails = modifiedError.errorDetails


    } else if (err.name === 'CastError') {
        const modifiedError = handleCastError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorMessage = modifiedError.errorMessage;
        errorDetails = modifiedError.errorDetails


    } else if (err.code === 11000) {
        const modifiedError = handleDuplicateError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorMessage = modifiedError.errorMessage;
        errorDetails = modifiedError.errorDetails

    }
    else if (err.name === 'ValidationError') {
        const modifiedError = handleMongooseError(err)
        statusCode = modifiedError?.statusCode;
        message = modifiedError?.message;
        errorMessage = modifiedError.errorMessage;
        errorDetails = modifiedError.errorDetails


    } else {
        statusCode = 500;
    }
    if (err?.statusCode == 401) {
        err.stack = null;
        errorDetails = null;
        errorMessage = "You do not have the necessary permissions to access this resource."
    }






    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,

        errorDetails,
        // err,
        // stack: config.NODE_ENV === 'development' ? err?.stack : null
        stack: err?.stack
    });


}

export default globalErrorHandler