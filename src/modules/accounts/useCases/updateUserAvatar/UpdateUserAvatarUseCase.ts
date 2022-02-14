import { injectable, inject } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatarFile: string | undefined;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    if (!avatarFile) {
      throw new AppError("Avatar not provided", 403);
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
