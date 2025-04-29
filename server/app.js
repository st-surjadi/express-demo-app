import express from 'express'
import cors from 'cors'

// Routes
import userRoutes from './routes/user.js'
import accountRoutes from './routes/account.js'

// Repositories
import { UserRepository } from './repositories/user.js'
import { AccountRepository } from './repositories/account.js'

// Use Cases
import { UserUseCase } from './usecases/user.js'
import { AccountUseCase } from './usecases/account.js'

// Handlers
import { UserHandler } from './handlers/user.js'
import { AccountHandler } from './handlers/account.js'

export function createApp(db) {
  const app = express()

  app.use(express.json())
  app.use(cors())

  // Initialize dependencies
  const userRepository = new UserRepository(db)
  const accountRepository = new AccountRepository(db)

  const accountUseCase = new AccountUseCase(accountRepository)
  const userUseCase = new UserUseCase(userRepository, accountUseCase, db)

  const userHandler = new UserHandler(userUseCase)
  const accountHandler = new AccountHandler(accountUseCase)

  // Inject handlers into routes
  app.use('/users', userRoutes(userHandler))
  app.use('/accounts', accountRoutes(accountHandler))

  return app
}
