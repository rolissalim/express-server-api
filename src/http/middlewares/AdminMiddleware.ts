import { NextFunction, Request, Response } from "express";
import { User } from "../../database/entities/User";
import { ResponseUtil } from "../../utils/Response";

export class AdminMiddleware {
  static async check(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const user = req.user as User;
    return ResponseUtil.sendErrror(res, "Unauthorized", 403, null);
    next();
  }
}
