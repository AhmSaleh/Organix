import ProductService from "../services/ProductService";
import { IProduct } from "../model/Product.Model";
import mongoose from "mongoose";
import { rand, randBoolean, randEmail, randFood, randFullName, randImg, randNumber, randParagraph, randSentence } from '@ngneat/falso';
import envconf from "../envconf";
import { IUser, RoleEnum } from "../model/UserModel";
import UserService from "../services/UserService";
import { IRegesterData } from "./SchemaRegester";


let categories = [
  "Fruits",
  "Vegetables",
  "Meat",
  "Dairy",
  "Bakery",
  "Beverages",
  "Bread",
  "Canned Goods",
  "Condiments",
  "Cereals",
  "Desserts",
]



async function fillProducts() {
  const allProducts = await ProductService.getAllProducts();

  if (allProducts.length === 0) {
    
    for (const i of Array(1000).fill(1).map((x, i) => i+1)) {
      const randProduct :IProduct= {
        name: randFood(),
        rate: randNumber({ min: 1, max: 5 }),
        price: randNumber({ min: 10, max: 1000 }),
        shortDescription: randSentence(),
        availability: randBoolean(),
        imgURL: `http://localhost:3000/img/random.png?seed=${randFood().replaceAll(' ', '+')}`,
        weight: randNumber({ min: 1, max: 1000 }),
        availableInventory: randNumber({ min: 0, max: 100 }),
        longDescription: randParagraph(),
        productInformation: randParagraph(),
        categoryName: rand(categories),
      }
      
      await ProductService.createProduct(randProduct);
      if (i % 200 === 0)
        console.log(`${i} products added`);
    }
  }

}


async function addDefualtAdmin(){
  const admin:IRegesterData  = {
    name: {
      first:"admin",
      last:"admin"
    },
    email: envconf.adminEmail,
    password: envconf.adminPassword,
    role: RoleEnum.admin,
  }
  
    UserService.createUser(admin);
  
}

exports.fillProducts = fillProducts;


async function fillAll() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
    return;
  }
  else {
    fillProducts()
  }
  if(!await UserService.getUserByEmail(envconf.adminEmail)){
    addDefualtAdmin();
  }
}

async function resetAll() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
    return;
  }
  else {
    if (envconf.databaseReset){
      await mongoose.connection.dropDatabase();
      console.log("Database dropped");
    }
  }
}


async function main() {
  await resetAll();
  await fillAll();
} 

main();


