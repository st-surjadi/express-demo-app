import express from 'express'

export default function accountRoutes(accountHandler) {
  const router = express.Router()

  router.get('/user/:userId', accountHandler.getAccountsByUserId.bind(accountHandler))
  router.get('/:id', accountHandler.getAccountById.bind(accountHandler))

  router.post('/', accountHandler.createAccount.bind(accountHandler))

  router.delete('/:id', accountHandler.deleteAccount.bind(accountHandler))

  return router
}
