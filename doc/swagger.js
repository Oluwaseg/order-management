import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

// Load environment variables
dotenv.config();
// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0', // Specification version
  info: {
    title: 'Order Management API',
    version: '1.0.0',
    description: 'API for managing orders in an e-commerce application',
  },
  servers: [
    {
      url: process.env.API_SERVER_URL,
    },
  ],
  components: {
    schemas: {
      Orders: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          productId: { type: 'string' },
          quantity: { type: 'integer' },
          status: {
            type: 'string',
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              token: { type: 'string' },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
