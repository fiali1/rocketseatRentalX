import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;

  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]>;

  findById(car_id: string): Promise<Car | undefined>;
}

export { ICarsRepository };
