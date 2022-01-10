import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatarFile: string | undefined;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    if (!avatarFile) {
      throw new AppError("Avatar not provided", 403);
    }

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
