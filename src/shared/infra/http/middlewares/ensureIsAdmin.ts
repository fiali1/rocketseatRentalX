import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

export async function ensureIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;

  const usersRespository = new UsersRepository();
  const user = await usersRespository.findById(id);

  if (!user || !user.isAdmin) {
    return res.status(401).json({ error: "User is not an admin" });
  }

  return next();
}
