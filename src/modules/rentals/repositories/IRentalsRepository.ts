import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;

  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>;

  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>;

  findById(id: string): Promise<Rental | undefined>;

  findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
