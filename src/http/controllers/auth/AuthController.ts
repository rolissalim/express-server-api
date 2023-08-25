import { ResponseUtil } from "@/utils/Response";
import { LoginDTO, RegisterDTO } from "@http/dtos/AuthDTO";
import { compare } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { User } from "@/database/entities/User";
import { OauthToken } from "@/database/entities/OauthToken";
import { AppDataSource } from "@/database/data-source";
import JwtService from "./../../../utils/JwtService";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const registerData = req.body;

    const dto = new RegisterDTO();
    dto.email = registerData.email;
    dto.name = registerData.name;
    dto.password = registerData.password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = repo.create(registerData);
    await repo.save(user);

    return ResponseUtil.sendResponse(res, "Successfully registered", user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const dto = new LoginDTO();
    dto.email = email;
    dto.password = password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });

    if (!user) {
      return ResponseUtil.sendErrror(res, "Invalid credentials", 404, null);
    }
    let passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      return ResponseUtil.sendErrror(res, "Invalid credentials", 404, null);
    }

    const { accessToken, refreshToken } = JwtService.generateToken(user);

    return ResponseUtil.sendResponse(res, "login successfuly", {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer"
    });
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const params = req?.params;
    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneByOrFail({ id: params?.user['id'] });

    const { accessToken, refreshToken } = JwtService.generateToken(user);

    const ouathTokenRepository = AppDataSource.getRepository(OauthToken);
    const ouathToken = await ouathTokenRepository.findOneByOrFail({
      user_id: params?.user['id'],
      access_token: params?.token
    });

    ouathTokenRepository.merge(ouathToken, { is_active: "0" });
    await ouathTokenRepository.save(ouathToken);

    return ResponseUtil.sendResponse(res, "refresh token successfuly", {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer"
    });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const ouathTokenRepository = AppDataSource.getRepository(OauthToken);
    const ouathToken = await ouathTokenRepository.findOneByOrFail({
      user_id: req?.params?.user['id'],
      access_token: req?.params?.token
    });

    ouathTokenRepository.merge(ouathToken, { is_active: "0" });
    await ouathTokenRepository.save(ouathToken);

    return ResponseUtil.sendResponse(res, "logout successfuly", {});
  }
}

export default new AuthController();