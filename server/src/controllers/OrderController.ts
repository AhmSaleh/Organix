import { Request, Response } from "express";

import validate from "../Utils/OrderValidation";

import OrderCreateValidate from "../Utils/OrderCreateValidation";

import OrderService from "../services/OrderService";
import { RequestWithAuth } from "../middleware/authentication";
import { RoleEnum } from "../model/UserModel";
import ProductService from "../services/ProductService";

class OrderController {
  // static addOrder(req:Request,res:Response){
  //     var order = req.body;
  //     const valid = validate(order);
  //     if(valid){
  //         OrderService.insertOrder(order);
  //         res.status(201).json(order);
  //     }else{
  //         res.status(409).json(order);
  //     }

  // }

  static async getOrders(r: Request, res: Response) {
    let req = r as RequestWithAuth;

    if (req.tockenInfo.role == RoleEnum.admin) {
       res.status(200).json(await OrderService.getAll());
    } else if (req.tockenInfo.role == RoleEnum.merchant) {
      ProductService.getProductByMerchant(req.tockenInfo.UserId.toHexString());
      //TODO: check for orders with this products
    } else
    {
      res.status(200).json(await OrderService.getAllUserID(req.tockenInfo.UserId.toString()));
    }
  }

  // static async getAll(req: Request, res: Response) {
  //   try {
  //     res.status(200).json(await OrderService.getAll());
  //   } catch (err) {
  //     res.status(409).send();
  //   }
  // }

  // static async getOne(req: Request, res: Response) {
  //   try {
  //     var OrderID = req.params["id"];
  //     res.status(200).json(await OrderService.getOne(OrderID));
  //   } catch {
  //     res.status(409);
  //   }
  // }

  // static async getAllUserID(req: Request, res: Response) {
  //   try {
  //     var UserID = req.params["id"];
  //     res.status(200).json(await OrderService.getAllUserID(UserID));
  //   } catch {
  //     res.status(409);
  //   }
  // }




  static async updateOrder(r: Request, res: Response){
    let req = r as RequestWithAuth;
    //TODO: validate body
    let id = req.body.orderID;
    let status = req.body.OrderStatus;

    let oldStatus = await OrderService.getOrderStatus(id);
    if(oldStatus){
      if(oldStatus == '4' )
        return res.status(403).send();
    }else{
      return res.status(404).send();
    }


    if(req.tockenInfo.role == RoleEnum.merchant){
      return res.status(403).send();
    }

    if (req.tockenInfo.role == RoleEnum.admin) {
      if(status == '4'){
        return res.status(204).json(await OrderService.cancelOrder(id));
      }else{
        await OrderService.updateOrderStatus(id,status)
        return res.status(204).send();
      }

   } else if (req.tockenInfo.role == RoleEnum.user) {
    

      await OrderService.cancelOrder(id)
     return res.status(204).send();
    

   } 


  }

  static async createOrder(req: Request, res: Response) {
    //create data interface here
    try {
      let data = req.body;
      const valid = OrderCreateValidate(data);
      if (valid) {
        if (data.Method == 0) {
          let order = await OrderService.createOrderPaypal(data);

          if (Array.isArray(order)) {
            res.status(409).json(order);
          } else {
            res.status(201).send(order);
          }
        } else {
          let order = await OrderService.createOrderCash(data);

          if (typeof order == "string") res.status(201).send(order);
          else res.status(409).json(order);
        }
      } else {
        res.status(409).send();
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async captureOrder(req: Request, res: Response) {
    try {
      //create data interface here
      let data = req.body;
      //TODO:validation here
      res.status(200).json(await OrderService.captureOrder(data));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default OrderController;
