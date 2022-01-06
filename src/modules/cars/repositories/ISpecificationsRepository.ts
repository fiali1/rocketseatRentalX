import { Specification } from "../model/Specification";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): void;

  list(): Specification[];

  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO };
