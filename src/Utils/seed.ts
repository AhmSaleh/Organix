import ProductService from "../services/ProductService";
import { IProduct, Status } from "../model/Product.Model";
import mongoose from "mongoose";
import {
  rand,
  randBoolean,
  randCat,
  randEmail,
  randFirstName,
  randFood,
  randFullName,
  randImg,
  randNumber,
  randParagraph,
  randSentence,
} from "@ngneat/falso";
import envconf from "../envconf";
import { IUser, RoleEnum } from "../model/UserModel";
import UserService from "../services/UserService";
import { IRegesterData } from "./SchemaRegester";
import { ICategory } from "../model/Category";
import CategoryService from "../services/CategoryService";

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
];

function randImgLocal(seed: string = "") {
  if (!seed) {
    seed = randFood();
  }
  //encoding the seed to url
  const encodedSeed = encodeURIComponent(seed);

  return `http://localhost:3000/img/random.png?seed=${encodedSeed}`;
}

async function fillIfEmptyProducts(merchants_ids: mongoose.Types.ObjectId[]) {
  const allProducts = await ProductService.getAllProducts();

  if (allProducts.length === 0) {
    for (const i of Array(1000)
      .fill(1)
      .map((x, i) => i + 1)) {
      const randProduct: IProduct = {
        name: randFood(),
        rate: randNumber({ min: 1, max: 5 }),
        price: randNumber({ min: 10, max: 1000 }),
        shortDescription: randFood() + randFood() + randFood(),
        availability: randBoolean(),
        imgURL: randImgLocal(),
        imagesURL: Array(randNumber({ min: 1, max: 5 }))
          .fill(1)
          .map((x) => randImgLocal()),
        weight: randNumber({ min: 1, max: 1000 }),
        availableInventory: randNumber({ min: 0, max: 100 }),
        longDescription: randParagraph(),
        productInformation: randParagraph(),
        categoryName: rand(categories),
        merchantId: rand(merchants_ids),
        status: randomEnum(Status),
        dateAdded: randNumber({ min: 10, max: 1000000000 }),
      };

      await ProductService.createProduct(randProduct);
      if (i % 200 === 0) console.log(`${i} products added`);
    }
  }
}

async function addDefualtAdmin() {
  const admin: IRegesterData = {
    name: {
      first: "admin",
      last: "admin",
    },
    email: envconf.adminEmail,
    password: envconf.adminPassword,
    role: RoleEnum.admin,
    phone: "01112020153",
    img: randImgLocal(),
    addresses: [],
  };
  await UserService.createUser(admin);
}

async function fillIfEmptyCategories() {
  const allCategories = await CategoryService.getAllCategories();
  if (allCategories.length === 0) {
    for (let cat of categories) {
      const randCat: ICategory = {
        name: cat,
        imageUrl:
          "http://envato.jayasankarkr.in/code/profile/assets/img/profile-2.jpg",
      };
      await CategoryService.createCategory(randCat);
    }
    console.log(`${categories.length} categories added`);
  }
}

async function fillIfEmptyUsers(count: number, role: RoleEnum) {
  const allUsers = await UserService.getAllUsers();
  let specificRole = allUsers.filter((x) => x.role === role);
  if (specificRole.length === 0) {
    for (const i of Array(count)
      .fill(1)
      .map((x, i) => i + 1)) {
      const randUser: IRegesterData = {
        name: {
          first: randFirstName(),
          last: randFirstName(),
        },
        email: randEmail(),
        password: "12345678",
        role: role,
        phone: "01112020153",
        img: "imgSrc",
        addresses: [],
      };

      specificRole.push(await UserService.createUser(randUser));
    }
    console.debug(`${count} ${role} users added`);
  }
  return specificRole;
}

async function filldummyData() {
  const merchants = await fillIfEmptyUsers(10, RoleEnum.merchant);
  await fillIfEmptyProducts(merchants.map((x) => x._id));
  await fillIfEmptyUsers(30, RoleEnum.user);
  await fillIfEmptyCategories();
}

async function fillAll() {
  // default admin
  if (!(await UserService.getUserByEmail(envconf.adminEmail))) {
    await addDefualtAdmin();
    console.log("Default admin added");
  } else {
    //update the password
    await UserService.updateUserPassword(
      envconf.adminEmail,
      envconf.adminPassword
    );
    console.log("Admin password updated");
  }
  //dummy data
  if (process.env.NODE_ENV != "production") {
    await filldummyData();
  }
}

async function resetAll() {
  // disable this functino for production
  if (process.env.NODE_ENV === "production") {
    console.log("Production mode");
    return;
  } else {
    if (envconf.databaseReset) {
      await mongoose.connection.dropDatabase();
      console.log("Database dropped");
    }
  }
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

async function main() {
  await resetAll();
  await fillAll();
}

main();
