import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../../utils/Response";
import { AppDataSource } from "./../../database/data-source";
import { User } from "./../../database/entities/User";
import { OauthToken } from "@/database/entities/OauthToken";
import JwtService from "@/utils/JwtService";

class AuthMiddleware {
  
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization: tokenHeader } = req.headers;
    if (!tokenHeader) {
      return ResponseUtil.sendErrror(res, "Token not provided", 401, null);
    }

    const token = tokenHeader.split(" ")[1];

    try {
      const decoded = JwtService.verify(token, process.env.ACCESS_TOKEN_KEY || "secret123");
      
      // @ts-ignore
      const { identifier: id } = decoded;
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneByOrFail({ id });

      const ouathTokenRepository = AppDataSource.getRepository(OauthToken);
      const ouathToken = await ouathTokenRepository.findOneBy({
        user_id: user.id,
        access_token: token,
        is_active: "1",
      });

      if(!ouathToken) {
        return ResponseUtil.sendErrror(res, "Invalid token", 401, null);
      }

      // @ts-ignore
      req.params.user = user;
      req.params.token = token;

    } catch (error) {
      console.error(error);
      return ResponseUtil.sendErrror(res, "Invalid token", 401, null);
    }
    next();
  }
}

export default new AuthMiddleware()