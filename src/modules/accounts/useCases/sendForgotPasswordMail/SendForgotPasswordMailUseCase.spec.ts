import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Password Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      mailProvider,
      dateProvider
    );
  });

  it("should be able to send a forgot password mail to an user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
      driver_license: "123456789",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a forgot password mail to a non existing user", async () => {
    expect(async () => {
      await sendForgotPasswordMailUseCase.execute("fake@email.com");
    }).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create a user token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokenRepositoryInMemory,
      "create"
    );

    const user: ICreateUserDTO = {
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
      driver_license: "123456789",
    };

    await usersRepositoryInMemory.create(user);

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
