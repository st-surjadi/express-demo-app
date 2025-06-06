// import sqlite3 from 'sqlite3'
// import { open } from 'sqlite'
// sqlite3.verbose()

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export const initDb = async () => {
  // --- SQLite code commented out ---
  // const db = await open({
  //   filename: './database/database.sqlite',
  //   driver: sqlite3.Database,
  // })

  // await db.exec(`...`)
  // await db.exec('PRAGMA foreign_keys = ON;')
  // return db

  // --- Supabase logic starts here ---

  // USERS
  const { data: users, error: usersError } = await supabase.from('users').select('id').limit(1)
  if (usersError) throw usersError
  if (!users || users.length === 0) {
    const { error } = await supabase.from('users').insert([
      {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        gender: 'Male',
        address: '123 North Street',
        phone: '555-1234',
        profile_picture:
          'https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
      },
    ])
    if (error) throw error
  }

  // BANKS
  const { data: banks, error: banksError } = await supabase.from('banks').select('bank_code').limit(1)
  if (banksError) throw banksError
  if (!banks || banks.length === 0) {
    const { error } = await supabase.from('banks').insert([
      {
        bank_code: 1234,
        bank_name: 'Bank Central Asia',
        bank_description: 'Bank Central Asia is a multinational banking group headquartered in Jakarta, Indonesia.',
      },
      {
        bank_code: 1235,
        bank_name: 'Bank Mandiri',
        bank_description: 'Bank Mandiri is a public bank in Indonesia.',
      },
    ])
    if (error) throw error
  }

  // BANK ACCOUNTS
  const { data: accounts, error: accountsError } = await supabase.from('bank_accounts').select('id').limit(1)
  if (accountsError) throw accountsError
  if (!accounts || accounts.length === 0) {
    // Get user id and bank_code for foreign keys
    const { data: userRows } = await supabase.from('users').select('id').limit(1)
    const { data: bankRows } = await supabase.from('banks').select('bank_code').limit(1)
    if (userRows && userRows.length > 0 && bankRows && bankRows.length > 0) {
      const user_id = userRows[0].id
      const bank_code = bankRows[0].bank_code
      const { error } = await supabase.from('bank_accounts').insert([
        {
          user_id,
          bank_code,
          account_number: '1234567890',
          account_type: 'Savings',
          balance: 1000000,
        },
      ])
      if (error) throw error
    }
  }

  return supabase
}
