import express from 'express'

export default function userRoutes(userHandler) {
  const router = express.Router()

  router.get('/', userHandler.getAllUsers.bind(userHandler))
  router.get('/:id', userHandler.getUserById.bind(userHandler))

  router.post('/', userHandler.createUser.bind(userHandler))

  return router
}
