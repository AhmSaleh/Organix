import { Request, Response } from "express";

import validate from "../Utils/CartValidation";

import CartService from "../services/CartService";

class CartController {
  static async getCart(req: Request, res: Response) {
    try {
      var UserID = req.params["id"];
      res.status(200).json(await CartService.getCart(UserID));
    } catch(err) {
      console.log(err)
      res.status(409);
    }
  }

  static async UpdateCart(req: Request, res: Response) {
    try{
    var cart = req.body;
    const valid = validate(cart);
    if (valid) {
     await CartService.UpdateCart(cart);
      res.status(201).json(cart);
    } else {
      res.status(409).json(cart);
    }
  } catch(err){
    //console.log(err)
    res.status(409);
  }
}
}

export default CartController;
