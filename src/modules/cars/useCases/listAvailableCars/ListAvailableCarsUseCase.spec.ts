import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarNameTest",
      description: "CarDescriptionTest",
      daily_rate: 100,
      license_plate: "ABC-5678",
      fine_amount: 10,
      brand: "CarBrandTest",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarNameTest",
      description: "CarDescriptionTest",
      daily_rate: 100,
      license_plate: "ABC-5678",
      fine_amount: 10,
      brand: "CarBrandTest",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "CarNameTest",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarNameTest",
      description: "CarDescriptionTest",
      daily_rate: 100,
      license_plate: "ABC-5678",
      fine_amount: 10,
      brand: "CarBrandTest",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "CarBrandTest",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "CarNameTest",
      description: "CarDescriptionTest",
      daily_rate: 100,
      license_plate: "ABC-5678",
      fine_amount: 10,
      brand: "CarBrandTest",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
