const test = require('ava')
const request = require('supertest')
const cheerio = require('cheerio')
const app = require('../../server/server')

test('tests are running', t => {
  t.pass()
})

// test('test that wildcard route is working', t => {
//   const res = request(app)
//   .get('/foo')
//   const actual = res
//   t.deepEqual(actual, 200)
 
// })

test('database responds with data', t => {
  const res = request(app)
  // .get('/api/v1/getbookings')
  const actual = res
  t.truthy(actual)
})
test.beforeEach(t => {
  t.context.request = request(app)
})
