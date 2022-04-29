import ProductService from "../services/ProductService";
import products from "../seedData/products.sample.json";
import { IProduct } from "../model/Product.Model";
import mongoose from "mongoose";


async function fillProducts() {
  const allProducts = await ProductService.getAllProducts();

  if (allProducts.length === 0) {
    let index = 0
    for (const product of products) {
      await ProductService.createProduct(product as IProduct);
      index++;
      if (index % 200 === 0)
        console.log(`${index} products added`);
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
  // await resetAll();
  await fillAll();
} 

main();


