const express = require('express');
   const swaggerUi = require('swagger-ui-express');
   const swaggerFile = require('./swagger_output.json');
   const app = express();
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    
