import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImagesControllerUseCase = container.resolve(
      UploadCarImagesUseCase
    );

    const images_name = images?.map((image) => image.filename);

    await uploadCarImagesControllerUseCase.execute({
      car_id,
      images_name,
    });

    return res.status(201).send();
  }
}

export { UploadCarImagesController };
