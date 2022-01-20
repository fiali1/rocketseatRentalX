import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate user", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("sould be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Test User",
      email: "test@email.com",
      password: "1234",
      driver_license: "123456789",
    };

    createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to autenticate an nonexistent user", async () => {
    const user: ICreateUserDTO = {
      name: "Teste User",
      driver_license: "12345",
      email: "teste@teste.com",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: "emailerrado@teste.com",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with wrong password", async () => {
    const user: ICreateUserDTO = {
      name: "Teste User",
      driver_license: "12345",
      email: "teste@teste.com",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "1235",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
