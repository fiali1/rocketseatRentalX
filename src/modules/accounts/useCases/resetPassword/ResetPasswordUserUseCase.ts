import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Invalid token");
    }

    const dateNow = this.dateProvider.dateNow();

    const isBefore = this.dateProvider.compareIfBefore(
      dateNow,
      userToken.expiration_date
    );

    if (!isBefore) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
