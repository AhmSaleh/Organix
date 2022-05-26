const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'oragnix shop',
    description: 'small shop',
  },
  host: 'localhost:3000',
  schemes: ['http'],
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