import { Request, Response } from 'express';

import validate from "../Utils/OrderValidation"

import OrderService from '../services/OrderService';

class OrderController{

static addOrder(req:Request,res:Response){
    var order = req.body;
    const valid = validate(order);
    if(valid){
        OrderService.addOrder(order);
        res.status(201).json(order);
    }else{
        res.status(409).json(order);
    }

}


static async getAll(req:Request,res:Response){
    try{
    res.status(200).json(await OrderService.getAll()); 
    }catch(err){
        res.status(409).send();
    }
}


static async getOne(req:Request,res:Response){
    try{
    var OrderID = req.params["id"];
    res.status(200).json(await OrderService.getOne(OrderID)); 
    }catch{
        res.status(409);
    }
}

static async getAllUserID(req:Request,res:Response){
    try{
        var UserID = req.params["id"];
        res.status(200).json(await OrderService.getAllUserID(UserID)); 
    }catch{
        res.status(409);  
    }
}

}

export default OrderController;