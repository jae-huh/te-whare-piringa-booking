import request from 'superagent'

const localStorage = global.window.localStorage
const baseUrl = '/api/v1'

export function login (method = 'get', endpoint, data = {}) {
  const dataMethod = method.toLowerCase() === 'get' && 'query' || 'send'
  const token = localStorage.getItem('id_token')
  const headers = {
    Accept: 'application/json'
  }
  headers['Authorization'] = `Bearer ${token}`
  return request[method](baseUrl + endpoint)
    .set(headers)[dataMethod](data)
    .catch(err => {
      throw err
    })
}

export function getUnconfirmed (cb) {
  request.get('/api/v1/admin/getunconfirmed')
  .end((err, data) => {
    if (err) return cb(err)
    cb(null, data.body)
  })
}

export function newBooking (data, cb) {
  request.post('api/v1/user/addbooking')
  .send(data)
  .then(res => {
    cb(null, res)
  })
}
