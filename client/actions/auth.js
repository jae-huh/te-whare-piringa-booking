import {login} from '../api'

export function checkLogin () {
  return dispatch => {
    dispatch(checkingLogin)
    login('get', '/checklogin')
      .then(res => {
        console.log(res)
      })
  }
}

function checkingLogin () {
  return {
    type: 'CHECKING_LOGIN'
  }
}
