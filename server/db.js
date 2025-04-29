import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

sqlite3.verbose()

export const initDb = async () => {
  const db = await open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      age INTEGER,
      gender TEXT,
      address TEXT,
      phone TEXT,
      profile_picture TEXT
    );
  
    CREATE TABLE IF NOT EXISTS bank_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      bank_code INTEGER,
      account_number TEXT,
      account_type TEXT,
      balance REAL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      FOREIGN KEY (bank_code) REFERENCES banks(bank_code) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS banks (
      bank_code INTEGER PRIMARY KEY,
      bank_name TEXT,
      bank_description TEXT
    )
  `)

  const users = await db.get(`SELECT COUNT(*) AS count FROM users`)
  if (users?.count === 0) {
    await db.run(
      `INSERT INTO users (name, email, age, gender, address, phone, profile_picture)
       VALUES (?,?,?,?,?,?,?)`,
      [
        'John Doe',
        'john@example.com',
        30,
        'Male',
        '123 North Street',
        '555-1234',
        'https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
      ]
    )
  }

  const banks = await db.get(`SELECT COUNT(*) AS count FROM banks`)
  if (banks?.count === 0) {
    await db.run(
      `INSERT INTO banks (bank_code, bank_name, bank_description)
       VALUES (?,?,?)`,
      [
        1234,
        'Bank Central Asia',
        'Bank Central Asia is a multinational banking group headquartered in Jakarta, Indonesia.',
      ]
    )
    await db.run(
      `INSERT INTO banks (bank_code, bank_name, bank_description)
       VALUES (?,?,?)`,
      [1235, 'Bank Mandiri', 'Bank Mandiri is a public bank in Indonesia.']
    )
  }

  const accounts = await db.get(`SELECT COUNT(*) AS count FROM bank_accounts`)
  if (accounts?.count === 0) {
    await db.run(
      `INSERT INTO bank_accounts (user_id, bank_code, account_number, account_type, balance)
       VALUES (?,?,?,?,?)`,
      [1, 1234, '1234567890', 'Savings', 1000000]
    )
  }

  await db.exec('PRAGMA foreign_keys = ON;')

  return db
}
