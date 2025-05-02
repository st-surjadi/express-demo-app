import { sendError, sendSuccess } from '../utils/responseHandler.js'

export class UserHandler {
  constructor(userUseCase) {
    this.userUseCase = userUseCase
  }

  async createUser(req, res) {
    try {
      const userId = await this.userUseCase.createUser(req.body)
      sendSuccess(res, { user_id: userId }, 'User created successfully', 201)
    } catch (err) {
      console.error(err)
      sendError(res, err.message || 'Error creating user')
    }
  }

  async getAllUsers(req, res) {
    try {
      const { search } = req.query
      const searchParams = {}

      if (search) {
        searchParams.name = search
        searchParams.email = search
      }

      const users = await this.userUseCase.getAllUsers(searchParams)
      sendSuccess(res, users, 'Users retrieved successfully')
    } catch (err) {
      console.error(err)
      sendError(res, 'Error fetching users')
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userUseCase.getUserById(req.params.id)
      if (!user) {
        return sendError(res, 'User not found', 404)
      }
      sendSuccess(res, user, 'User retrieved successfully')
    } catch (err) {
      console.error(err)
      sendError(res, 'Error fetching user by ID')
    }
  }
}
