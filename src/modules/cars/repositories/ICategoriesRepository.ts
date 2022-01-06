import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICreateCategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;

  list(): Category[];

  findByName(name: string): Category | undefined;
}

export { ICreateCategoriesRepository, ICreateCategoryDTO };
