import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(user_id);

    return res.json(user);
  }
}

export { ProfileUserController };
