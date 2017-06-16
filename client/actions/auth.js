import {login} from '../api'

export function checkLogin () {
  return dispatch => {
    dispatch(checkingLogin())
    login('get', '/checklogin')
      .then(res => {
        if (!res.body.user) {
          return dispatch(noUserExists())
        }
        return dispatch(loggedIn(user))
      })
  }
}

function checkingLogin () {
  return {
    type: 'CHECKING_LOGIN'
  }
}

function noUserExists () {
  return {
    type: 'NO_USER'
  }
}

function loggedIn (user) {
  return {
    type: 'LOGGED_IN',
    user
  }
}
