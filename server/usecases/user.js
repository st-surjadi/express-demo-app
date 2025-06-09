import { User } from '../models/user.js'

export class UserUseCase {
  constructor(userRepository, accountUseCase, db) {
    this.userRepository = userRepository
    this.accountUseCase = accountUseCase
    this.db = db
  }

  async createUser(userData) {
    const user = new User(userData)
    user.validate()

    try {
      await this.db.exec('BEGIN TRANSACTION')

      const userId = await this.userRepository.create(user)

      if (userData.accounts?.length) {
        for (const account of userData.accounts) {
          await this.accountUseCase.createAccount({
            ...account,
            user_id: userId,
          })
        }
      }

      await this.db.exec('COMMIT')
      return userId
    } catch (err) {
      await this.db.exec('ROLLBACK')
      throw err
    }
  }

  async getAllUsers(searchParams = {}) {
    const rows = await this.userRepository.findAll(searchParams)
    return this._groupUserAccounts(rows)
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id)
    if (!user) return null

    const rows = [user]
    return this._groupUserAccounts(rows)
  }

  _groupUserAccounts(rows) {
    const usersMap = {}

    for (const row of rows) {
      if (!usersMap[row.id]) {
        usersMap[row.id] = {
          id: row.id,
          name: row.name,
          email: row.email,
          age: row.age,
          gender: row.gender,
          address: row.address,
          phone: row.phone,
          profile_picture: row.profile_picture,
          accounts: [...row.bank_accounts],
        }
      }

      // Used for manual LEFT JOIN process
      // if (row.bank_id) {
      //   usersMap[row.id].accounts.push({
      //     id: row.bank_id,
      //     bank_code: row.bank_code,
      //     account_number: row.account_number,
      //     account_type: row.account_type,
      //   })
      // }
    }

    return Object.values(usersMap)
  }
}
