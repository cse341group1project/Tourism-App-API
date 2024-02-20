const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tourism API",
    description: "Tourism API",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
