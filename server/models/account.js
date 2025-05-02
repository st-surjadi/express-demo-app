export class Account {
  constructor({ id, user_id, bank_code, account_number, account_type, balance }) {
    this.id = id
    this.user_id = user_id
    this.bank_code = bank_code
    this.account_number = account_number
    this.account_type = account_type
    this.balance = balance
  }
  validate() {
    if (!this.user_id) {
      throw new Error('User id is required')
    }
    if (!this.bank_code) {
      throw new Error('Bank code is required')
    }
    if (!this.account_number) {
      throw new Error('Account number is required')
    }
    if (!this.account_type) {
      throw new Error('Account type is required')
    }
    if (this.balance < 0) {
      throw new Error('Balance cannot be negative')
    }
  }
}
