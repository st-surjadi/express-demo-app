export class UserRepository {
  constructor(db) {
    this.db = db
  }
  async create(userData) {
    const result = await this.db.run(
      `INSERT INTO users (name, email, age, gender, address, phone, profile_picture)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.name,
        userData.email,
        userData.age,
        userData.gender,
        userData.address,
        userData.phone,
        userData.profile_picture,
      ]
    )
    return result.lastID
  }

  async findAll(searchParams = {}) {
    const { name, email } = searchParams
    let query = this.db.from('users').select('*')

    if (name) {
      query = query.ilike('name', `%${name}%`)
    }
    if (email) {
      query = query.ilike('email', `%${email}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  }

  async findById(id) {
    const { data, error } = await this.db
      .from('users')
      .select('*, bank_accounts(id, bank_code, account_number, account_type)')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }
}
