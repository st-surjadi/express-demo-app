export class AccountRepository {
  constructor(db) {
    this.db = db
  }

  async create(accountData) {
    const { data, error } = await this.db
      .from('bank_accounts')
      .insert([
        {
          user_id: accountData.user_id,
          bank_code: accountData.bank_code,
          account_number: accountData.account_number,
          account_type: accountData.account_type,
          balance: accountData.balance,
        },
      ])
      .select()
      .single()
    if (error) throw error
    return data.id
  }

  async findByUserId(userId) {
    const { data, error } = await this.db.from('bank_accounts').select('*').eq('user_id', userId)
    if (error) throw error
    return data
  }

  async findById(id) {
    const { data, error } = await this.db.from('bank_accounts').select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  async deleteById(id) {
    const { error } = await this.db.from('bank_accounts').delete().eq('id', id)
    if (error) throw error
    return 1 // returns 1 if deleted, 0 if not found
  }
}
