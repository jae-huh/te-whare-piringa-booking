const path = require('path')
require('dotenv').config({path: path.join(__dirname, '../..', '.env')})
const MongoClient = require('mongodb').MongoClient

const moment = require('moment')

const {mongoDbUri} = require('../../shared/vars')

const dbName = 'te-whare-piringa'
const collectionName = 'bookings'
const client = new MongoClient(mongoDbUri, {useNewUrlParser: true})

const bookings = [
  { // yesterday
    'userid': 123456,
    'startDate': getDate(-1, 8),
    'endDate': getDate(-1, 18),
    'confirmed': true
  }, { // today
    'userid': 123336,
    'startDate': getDate(0, 8),
    'endDate': getDate(0, 18),
    'confirmed': false
  }, { // tomorrow
    'userid': 123446,
    'startDate': getDate(1, 8),
    'endDate': getDate(1, 18),
    'confirmed': true
  }
]

function getDate (todayOffset, hour) {
  return moment().add(todayOffset, 'days').hour(hour).valueOf()
}

saveBookings()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(bookings.length, 'bookings have been added to the database')
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Error: no booking were added to the database:', err.message)
    client.close()
  })
  .finally(() => client.close())

function saveBookings () {
  return getDatabase()
    .then(db => db.collection(collectionName).insertMany(bookings))
}

function getDatabase () {
  return client.connect()
    .then(conn => conn.db(dbName))
}
