import { Request, Response } from 'express';

import validate from "../Utils/OrderValidation";

import OrderCreateValidate from '../Utils/OrderCreateValidation';

import OrderService from '../services/OrderService';

class OrderController{

static addOrder(req:Request,res:Response){
    var order = req.body;
    const valid = validate(order);
    if(valid){
        OrderService.insertOrder(order);
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

static async createOrder(req:Request,res:Response){
    //create data interface here
    try{
    let data = req.body;
    
    const valid = OrderCreateValidate(data)
    if(valid){

    //TODO: add order to database without confirmation 
    res.status(201).json(await OrderService.createOrder(data)); 
    }else{
        res.status(409); 
    }
    }catch(err:any){
        res.status(500).json({ error: err.message })
    }
}

static async captureOrder(req:Request,res:Response){

    try{
    //create data interface here
     let data = req.body;
    //TODO:validation here
    //TODO: confirm order in database
    res.status(200).json(await OrderService.captureOrder(data)); 
    }catch(err:any){
        res.status(500).json({ error: err.message })
    }
}


}

export default OrderController;