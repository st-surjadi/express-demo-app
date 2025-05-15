import { sendError, sendSuccess } from '../utils/responseHandler.js'

export class AccountHandler {
  constructor(accountUseCase) {
    this.accountUseCase = accountUseCase
  }

  async createAccount(req, res) {
    try {
      const accountId = await this.accountUseCase.createAccount(req.body)
      sendSuccess(res, { ...accountId }, 'Account created successfully', 201)
    } catch (err) {
      console.error(err)
      sendError(res, err.message || 'Error creating account')
    }
  }

  async getAccountsByUserId(req, res) {
    try {
      const accounts = await this.accountUseCase.getAccountsByUserId(req.params.userId)
      if (!accounts.length) {
        return sendError(res, 'No accounts found for this user', 404)
      }
      sendSuccess(res, accounts, 'Accounts retrieved successfully')
    } catch (err) {
      console.error(err)
      sendError(res, 'Error retrieving accounts')
    }
  }

  async getAccountById(req, res) {
    try {
      const account = await this.accountUseCase.getAccountById(req.params.id)
      if (!account) {
        return sendError(res, 'Account not found', 404)
      }
      sendSuccess(res, account, 'Account retrieved successfully')
    } catch (err) {
      console.error(err)
      sendError(res, 'Error retrieving account')
    }
  }

  async deleteAccount(req, res) {
    try {
      const deleted = await this.accountUseCase.deleteAccountById(req.params.id)
      if (!deleted) {
        return sendError(res, 'Account not found', 404)
      }
      sendSuccess(res, {}, 'Account deleted successfully')
    } catch (err) {
      console.error(err)
      sendError(res, 'Error deleting account')
    }
  }
}
