import request from 'superagent'

const localStorage = global.window.localStorage
const baseUrl = '/api/v1'

export function callApi (endpoint, method = 'get', data = {}) {
  const dataMethod = method.toLowerCase() === 'get' ? 'query' : 'send'
  const token = localStorage.getItem('token')
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
