export class User {
  constructor(userData) {
    this.name = userData.name
    this.email = userData.email
    this.age = userData.age
    this.gender = userData.gender
    this.address = userData.address
    this.phone = userData.phone
    this.profile_picture = userData.profile_picture
    this.accounts = userData.accounts || []
  }
  validate() {
    if (!this.name) throw new Error('Name is required')
    if (!this.email) throw new Error('Email is required')
    if (!this.email.includes('@')) throw new Error('Invalid email format')
    if (this.age && this.age < 0) throw new Error('Age cannot be negative')
  }
}
