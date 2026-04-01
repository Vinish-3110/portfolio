const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API documentation for the Portfolio backend',
    },
    servers: [
      {
        url: 'https://portfolio-d559.onrender.com',
        description: 'Production Server (Render)',
      },
      {
        url: 'http://localhost:5000',
        description: 'Local Production/Dev Server',
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'], // Look for JSDoc annotations in routes
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  // Update the swagger servers dynamically if process.env.RENDER_EXTERNAL_URL is set (from Render auto env vars)
  if (process.env.RENDER_EXTERNAL_URL) {
    swaggerSpec.servers.unshift({
      url: process.env.RENDER_EXTERNAL_URL,
      description: 'Production Server (Render)',
    });
  } else if (process.env.BACKEND_URL) {
      swaggerSpec.servers.unshift({
      url: process.env.BACKEND_URL,
      description: 'Production Server',
    });
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
