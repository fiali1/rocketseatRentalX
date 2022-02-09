import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgottenPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgottenPasswordMailUseCase.execute(email);

    return res.send();
  }
}

export { SendForgotPasswordMailController };
