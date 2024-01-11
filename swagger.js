
const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
async function generateSwaggerSpec() {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
    },
    apis: ['./Api_Controller/*.js'], // Укажите путь к вашим маршрутам
  };

  return swaggerJSDoc(options);
}

module.exports = generateSwaggerSpec;