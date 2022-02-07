import dayjs from "dayjs";

import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: IDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    createRentalUseCase = new CreateRentalUseCase(
      carsRepositoryInMemory,
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await createCarUseCase.execute({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      brand: "brand",
      category_id: "1234",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      const car1 = await createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "DEV-1337",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });

      const car2 = await createCarUseCase.execute({
        name: "Name Car2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "DEV-12337",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });

      await createRentalUseCase.execute({
        car_id: car1.id,
        user_id: "54321a",
        expected_return_date: dayAdd24Hours,
      });

      await expect(
        createRentalUseCase.execute({
          car_id: car2.id,
          user_id: "54321a",
          expected_return_date: dayAdd24Hours,
        })
      ).rejects.toEqual(
        new AppError("There's a rental in progress for this user!")
      );
    });
  });

  it("should not be able to create a new rental when there is a a active rental for the same car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "DEV-1337",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "321",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available"));
  });

  it("should not be able to create a new rental with an invalid return time", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user_id_v1",
        car_id: "car_id",
        expected_return_date: new Date(),
      });
    }).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours")
    );
  });
});
