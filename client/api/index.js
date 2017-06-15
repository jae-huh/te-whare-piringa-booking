import request from 'superagent'

export function getBookings (callback) {
  request.get('/v1/getbookings')
  .end((err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res.body)
    }
  })
}
