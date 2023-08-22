import { AppDataSource } from "@/database/data-source";
import { OauthToken } from "@/database/entities/OauthToken";
import jwt, { sign } from "jsonwebtoken";

class JwtService {

  sign(payloads: any, secretKey: any, expiresIn: any) {
    return sign(payloads, secretKey, { expiresIn});
  } 

  verify(token: string, secretKey: any) {
    return jwt.verify(token, secretKey);
  }

  decodePayload(token: string){
    return jwt.decode(token);
  }

  generateToken(user: any) {
    const payloads = {
      identifier: user.id,
      ...user
    }

    let accessToken = this.sign(payloads, process.env.ACCESS_TOKEN_KEY, process.env.TOKEN_LIFE);
    let refreshToken = this.sign(payloads, process.env.ACCESS_TOKEN_KEY, process.env.REFRESH_TOKEN_LIFE);

    // insert token into table
    const repo = AppDataSource.getRepository(OauthToken);
    const oauthToken = repo.create({
      'user_id': user.id,
      'access_token': accessToken,
      'refresh_token': refreshToken,
      'expires_in': Math.floor(Date.now() / 1000) + (60 * 60)
    });
    repo.save(oauthToken);
    
    return {accessToken,refreshToken}
  }
}

export default new JwtService();