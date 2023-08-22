import { Response } from "express"

export class ResponseUtil {
  static sendResponse<T>(
    res: Response,
    message: string,
    data: T,
    statusCode = 200
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  }

  static sendResponseDatatable<T>(
    res: Response,
    message: string,
    data: T,
    meta: any = null,
    statusCode = 200
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    })
  }

  static sendErrror<T>(res: Response, message: string, statusCode = 500, error: T): Response<T> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    })
  }
}
