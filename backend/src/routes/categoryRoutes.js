import express from "express";
import { CategoryController } from "../controllers/categoryController.js";

const categoryRouter = express.Router();
const controller = CategoryController;

categoryRouter.get("/", controller.getCategories);
categoryRouter.get("/:id", controller.getCategoryById);

categoryRouter.post("/", controller.createCategory);

categoryRouter.delete("/:id", controller.deleteCategory);

export default categoryRouter;
