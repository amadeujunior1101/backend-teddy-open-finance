import cors from 'cors'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { AppDataSource } from '../infra/config'
import express, { Request, Response } from 'express'
import { userRoutes, shortenerRoutes } from '../routes'

const app = express()
const port = 3000
app.use(cors())

app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', shortenerRoutes)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Shortener API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/infra/config/swagger-docs.ts', './src/routes/*.ts'], // Inclui o arquivo de configuração e as rotas
}

const swaggerSpec = swaggerJSDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')

    app.get('/', (_req: Request, res: Response) => {
      res.send('health check')
    })

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
      console.log(
        `Swagger documentation available at http://localhost:${port}/api-docs`
      )
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
