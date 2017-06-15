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
  console.log(baseUrl + endpoint)
  return request[method](baseUrl + endpoint)
    .set(headers)[dataMethod](data)
    .then(res => {
      return res
    })
    .catch(err => {
      throw err
    })
}
