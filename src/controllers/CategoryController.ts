import { Request, Response } from "express";
import CategoeryService from "../services/CategoeryService";
import { RequestWithSchema } from "../middleware/validation";
import { ICategory } from "../model/Categoery";
import { RequestWithAuth } from "../middleware/authentication";
import ajv from "../Utils/validate";
import path from "path";

class CategoryController {
  static POSTCategory = POSTCategory;
  static GETCategories = GETCategories;
  static GETCategoryById = GETCategoryById;
  static DELETECategoryById = DELETECategoryById;
  static UPDATECategoryById = UPDATECategoryById;
  static GETCategoryByName = GETCategoryByName;
  static GETCategoryImage = GETCategoryImage;
}

async function GETCategoryImage(req: Request, res: Response) {
  try {
    const category = await CategoeryService.getCategoryById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send(`There is no category with the given id: ${req.params.id}.`);
    if (!category.imageUrl)
      return res.status(404).send(`This category has no image.`);
    const imgPath = "../../" + category.imageUrl;
    res.sendFile(path.join(__dirname, imgPath));
  } catch (err) {
    res.status(500).send(err);
  }
}
GETCategoryImage;

async function POSTCategory(r: Request, res: Response) {
  const validate = ajv.getSchema("category");
  const valid = validate!(r.body);
  if (!valid) return res.status(400).send();

  let req = r as RequestWithAuth & RequestWithSchema<ICategory>;
  try {
    const category = await CategoeryService.createCategory(req.body);
    res.send(category).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETCategories(req: Request, res: Response) {
  try {
    const categories = await CategoeryService.getAllCategories();
    res.send(categories).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETCategoryById(req: Request, res: Response) {
  try {
    const category = await CategoeryService.getCategoryById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .send(
          `Coudln't find category with the provided Id --> ${req.params.id}`
        );
    }
    res.send(category).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function DELETECategoryById(r: Request, res: Response) {
  let req = r as RequestWithAuth;
  try {
    const category = await CategoeryService.deleteCategory(req.params.id);
    if (!category) {
      return res
        .status(404)
        .send(
          `Coudln't find category with the provided Id --> ${req.params.id}`
        );
    }
    res.send(category).status(200);
  } catch (err) {
    res.status(500).send(err);
    //WARN is it safe to return error message here?
  }
}

async function UPDATECategoryById(r: Request, res: Response) {
  let req = r as RequestWithAuth & RequestWithSchema<ICategory>;
  const validate = ajv.getSchema("category");
  const valid = validate!(r.body);
  if (!valid) return res.status(400).send();
  try {
    const category = await CategoeryService.updateCategory(
      req.params.id,
      req.body
    );

    if (!category) {
      return res
        .status(404)
        .send(
          `Coudln't find category with the provided Id --> ${req.params.id}`
        );
    }
    res.send(category).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function GETCategoryByName(req: Request, res: Response) {
  try {
    const category = await CategoeryService.getCategoryByName(req.params.name);
    if (!category) {
      return res
        .status(404)
        .send(
          `Coudln't find category with the provided Name --> ${req.params.id}`
        );
    }
    res.send(category).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default CategoryController;
