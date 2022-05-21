import { Request, Response } from "express";
import CategoeryService from "../services/CategoryService";
import { RequestWithSchema } from "../middleware/validation";
import { ICategory } from "../model/Category";
import { RequestWithAuth } from "../middleware/authentication";


class CategoryController {
    static POSTCategory = POSTCategory;
    static GETCategories = GETCategories;
    static GETCategoryById = GETCategoryById;
    static DELETECategoryById = DELETECategoryById;
    static UPDATECategoryById = UPDATECategoryById;
    static GETCategoryByName = GETCategoryByName;
}

async function POSTCategory(r: Request, res: Response) {
    let req = r as RequestWithAuth & RequestWithSchema<ICategory>;
    try {
        const category = await CategoeryService.createCategory(req.data);
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
    try {
        const category = await CategoeryService.updateCategory(req.params.id, req.data);

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