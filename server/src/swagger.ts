import { RoleEnum } from "./model/UserModel";

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'oragnix shop',
    description: 'small shop',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    login:{
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
      },
    },
    
    regester_schema:{
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
        format: "password",
      },
      name: {
        type: "object",
        properties: {
          first: {
            type: "string",
            minLength: 2,
            maxLength: 20,
          },
          last: {
            type: "string",
            minLength: 2,
            maxLength: 20,
          },
        },
        required: ["first", "last"],
        additionalProperties: false,
      },
      role: {
        type: "string",
        enum: Object.values(RoleEnum),
        default: RoleEnum.user,
      },
      phone: {
        type: "string",
      },
      img: {
        type: "string",
      },
      addresses: {
        type: "array",
        items: { type: "string" },
      },
    },
    regesterForUser: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
        format: "password",
      },
      name: {
        type: "object",
        properties: {
          first: {
            type: "string",
            minLength: 2,
            maxLength: 20,
          },
          last: {
            type: "string",
            minLength: 2,
            maxLength: 20,
          },
        },
        required: ["first", "last"],
        additionalProperties: false,
      },
      phone: {
        type: "string",
      },
      img: {
        type: "string",
      },
      addresses: {
        type: "array",
        items: { type: "string" },
      },
    },
    
    updateUser: {
      email: {
        type: "string",
        format: "email",
        nullable: true,
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
        format: "password",
        nullable: true,
      },
      name: {
        type: "object",
        nullable: true,
        properties: {
          first: {
            type: "string",
            minLength: 2,
            maxLength: 20,
            nullable: true,
          },
          last: {
            type: "string",
            minLength: 2,
            maxLength: 20,
            nullable: true,
          },
        },
        additionalProperties: false,
      },
      phone: {
        type: "string",
        nullable: true,
      },
      img: {
        type: "string",
        nullable: true,
      },
      addresses: {
        type: "array",
        items: { type: "string" },
        nullable: true,
      },
    }
  }
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./src/server.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(
    ()=>{
        require("./server");
    }
);