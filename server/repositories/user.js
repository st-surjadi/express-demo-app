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
    const conditions = []
    const params = []

    if (name) {
      conditions.push('u.name LIKE ?')
      params.push(`%${name}%`)
    }
    if (email) {
      conditions.push('u.email LIKE ?')
      params.push(`%${email}%`)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' OR ')}` : ''

    return this.db.all(
      `
      SELECT u.*, b.id AS bank_id, b.bank_code, b.account_number, b.account_type
      FROM users u
      LEFT JOIN bank_accounts b ON u.id = b.user_id
      ${whereClause}
    `,
      params
    )
  }

  async findById(id) {
    return this.db.all(
      `
      SELECT u.*, b.id AS bank_id, b.bank_code, b.account_number, b.account_type
      FROM users u
      LEFT JOIN bank_accounts b ON u.id = b.user_id
      WHERE u.id = ?
    `,
      [id]
    )
  }
}
