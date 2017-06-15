import request from './superagent'

export function getUnconfirmed (cb) {
  request.get('/getunconfirmed')
  .end(data => {
    cb(data)
  })
}
