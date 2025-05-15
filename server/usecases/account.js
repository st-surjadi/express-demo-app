import { Account } from '../models/account.js'

export class AccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository
  }

  async createAccount(accountData) {
    const account = new Account(accountData)
    account.validate()

    const id = await this.accountRepository.create(account)
    return this.getAccountById(id)
  }

  async getAccountsByUserId(userId) {
    return this.accountRepository.findByUserId(userId)
  }

  async getAccountById(id) {
    return this.accountRepository.findById(id)
  }

  async deleteAccountById(id) {
    return this.accountRepository.deleteById(id)
  }
}
