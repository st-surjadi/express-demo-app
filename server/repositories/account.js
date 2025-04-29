export class AccountRepository {
  constructor(db) {
    this.db = db
  }

  async create(accountData) {
    const result = await this.db.run(
      `
        INSERT INTO bank_accounts (user_id, bank_code, account_number, account_type, balance)
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        accountData.user_id,
        accountData.bank_code,
        accountData.account_number,
        accountData.account_type,
        accountData.balance,
      ]
    )

    return result.lastID
  }

  async findByUserId(userId) {
    const accounts = await this.db.all(
      `
        SELECT *
        FROM bank_accounts
        WHERE user_id = ?
      `,
      [userId]
    )
    return accounts
  }

  async findById(id) {
    const account = await this.db.get(
      `
        SELECT *
        FROM bank_accounts
        WHERE id =?
      `,
      [id]
    )
    return account
  }

  async deleteById(id) {
    const result = await this.db.run(`DELETE FROM bank_accounts WHERE id = ?`, [id])

    return result.changes // returns 1 if deleted, 0 if not found
  }
}
