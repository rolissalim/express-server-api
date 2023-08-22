import { AppDataSource } from "@/database/data-source";
import { OauthToken } from "@/database/entities/OauthToken";
import { sign } from "jsonwebtoken";

export class JwtToken {
  static generateJwtToken(user: any) {
    const payloads = {
      identifier: user.id,
      role: {
        id: user.role.id,
        name: user.role.name
      }
    }

    let accessToken = sign(payloads, process.env.ACCESS_TOKEN_KEY || "secret123", {
      expiresIn: "1d",
    });

    let refreshToken = sign(payloads, process.env.REFRESH_TOKEN_KEY || "refreshsecret123", {
      expiresIn: "1d",
    });

    // insert token into table
    const repo = AppDataSource.getRepository(OauthToken);
    const userAuth = repo.create({
      'user_id': user.id,
      'access_token': accessToken,
      'refresh_token': refreshToken,
    });
    repo.save(userAuth);
    
    return {accessToken,refreshToken}
  }
}
