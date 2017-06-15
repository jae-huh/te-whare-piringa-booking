import request from 'superagent'

const baseUrl = '/api/v1'

export function postNewBooking (details, cb) {
  request.post(`${baseUrl}/user/addbooking`)
    .end((err, res) => {
      if (err) {
        cb(err)
      } else {
        console.log(res.body.result)
        cb(null, res.body.result)
      }
    })
}
