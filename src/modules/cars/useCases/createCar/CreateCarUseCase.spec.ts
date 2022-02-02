import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "CarName",
      description: "CarDescription",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "CarBrand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an existing license_plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "CarName1",
        description: "CarDescription1",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "CarBrand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "CarName2",
        description: "CarDescription2",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "CarBrand",
        category_id: "category",
      });
    }).rejects.toEqual(new AppError("Car already exists", 403));
  });

  it("should be able to create a car that is available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "CarName",
      description: "CarDescription",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "CarBrand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
