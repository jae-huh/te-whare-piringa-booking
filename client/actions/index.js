import {login, newBooking} from '../api'

export function postNewBooking (details, cb) {
  login('post', `${baseUrl}/user/addbooking`, details)
    .then(res => {

    })

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
