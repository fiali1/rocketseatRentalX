import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exist");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token_expiration_date = this.dayjsDateProvider.addDays(
      expires_refresh_token_days
    );

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expiration_date: refresh_token_expiration_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
