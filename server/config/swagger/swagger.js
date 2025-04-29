import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { PORT } from '../../server.js'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express SQLite API',
    version: '1.0.0',
    description: 'API documentation for Express SQLite Demo',
  },
  servers: [
    {
      url: `http://localhost:8081`,
      description: 'Development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ['./server/config/swagger/routes/*.js', './server/config/swagger/schemas/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app) => {
  // Serve swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Serve swagger spec as JSON
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
