import ProductService from "../services/ProductService";
import { IProduct } from "../model/Product.Model";
import mongoose from "mongoose";
import { rand, randBoolean, randEmail, randFood, randFullName, randImg, randNumber, randParagraph, randSentence } from '@ngneat/falso';


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
        imgURL: randImg(),
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


exports.fillProducts = fillProducts;


function fillAll() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
    return;
  }
  else {
    fillProducts()
  }
}

async function resetAll() {
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
    return;
  }
  else {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");
  }
}


async function main() {
  await resetAll();
  await fillAll();
} 

main();


