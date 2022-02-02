import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureIsAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureIsAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
