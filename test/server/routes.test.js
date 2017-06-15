const test = require('ava')
const request = require('supertest')
const cheerio = require('cheerio')
const server = require('../../server')

test('tests are running', t => {
  t.pass()
})

// test('Home route is repsonding', t => {
//   const expected = 'testtext'
//   request(server)
//   .get('/')
//   .end((err, res) => {
//     t.error(err)
//     const $ = cheerio.load(res.text)
//     const actual = $('#test').text
//     t.equals(actual, expected)
//     t.end()
//   })
// })
