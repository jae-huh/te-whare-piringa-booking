import request from 'superagent'
import {get} from '../auth/localstorage'
import {isAuthenticated} from '../auth'

const baseUrl = '/api/v1'

export function login (method = 'get', endpoint, data = {}) {
  const dataMethod = method.toLowerCase() === 'get' && 'query' || 'send'
  const token = get('id_token')
  const headers = {
    Accept: 'application/json'
  }
  if (isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return request[method](baseUrl + endpoint)
    .set(headers)[dataMethod](data)
    .then(res => {
      return res
    })
    .catch(err => {
      throw err
    })
}
