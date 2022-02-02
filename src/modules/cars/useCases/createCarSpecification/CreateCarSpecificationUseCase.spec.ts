import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to an existing car", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: "CarName",
      description: "CarDescription",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "CarBrand",
      category_id: "category",
    });

    const { id: specification_id } =
      await specificationsRepositoryInMemory.create({
        name: "SpecificationName",
        description: "SpecificationDescription",
      });

    const specifications_id = [specification_id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a non existing car", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toEqual(new AppError("Car does not exist"));
  });
});
