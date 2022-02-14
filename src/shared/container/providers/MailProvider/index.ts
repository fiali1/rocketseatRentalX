import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider =
  process.env.MAIL_PROVIDER === "ethereal"
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider);

container.registerInstance<IMailProvider>("MailProvider", mailProvider);
