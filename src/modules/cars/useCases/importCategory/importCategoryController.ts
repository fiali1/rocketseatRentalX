import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@errors/AppError";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    if (!file) {
      throw new AppError("File not found");
    }

    await importCategoryUseCase.execute(file);

    return res.status(201).send();
  }
}

export { ImportCategoryController };
