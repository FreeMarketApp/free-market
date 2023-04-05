import { get } from "http"

require('dotenv').config()
const { Client } = require('pg')

const db = new Client({
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
})

  db.connect((err: any) => {
    if (err) {
      console.error('connection error', err)
    } else {
      console.log('connected')
    }
  })


async function getAllUsers() {
  return db.query('SELECT * FROM freemarket."user"')
}

export {
  getAllUsers,

}