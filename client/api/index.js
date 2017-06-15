import request from 'superagent'

export function getUnconfirmed (cb) {
  request.get('/api/v1/admin/getunconfirmed')
  .end((err, data) => {
    if (err) return cb(err)
    cb(null, data.body)
  })
}
