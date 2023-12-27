const swaggerAutogen = require('swagger-autogen')();
   const outputFile = './swagger_output.json';
   const endpointsFiles = ['./index.js'];
   const generateSwaggerSpec = async () => {
    await swaggerAutogen(outputFile, endpointsFiles);
  };