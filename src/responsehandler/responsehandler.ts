import { Response } from "express";

export class ResponseHandler {
  async sendResponse(
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data?: object,
  ) {
    const response = {
      statusCode: statusCode,
      success: success,
      message: message,
      data: data ? data : {},
    };
    res.status(statusCode).json(response);
  }

  async sendErrorResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: object,
    type: string = 'BAD_REQUEST',
  ) {
    const response = {
      statusCode: statusCode,
      success: false,
      // message: STATUS_MSG.ERROR.ERROR_OCCURED,
      type: type,
    };
    
    // throw error(response, statusCode);
    res.status(statusCode).json(response);
  }
}