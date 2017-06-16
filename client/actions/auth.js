import {login} from '../api'
import history from '../utils/history'

export function checkLogin () {
  return dispatch => {
    dispatch(checkingLogin())
    login('get', '/checklogin')
      .then(res => {
        if (!res.body.user) {
          dispatch(noUserExists())
          return history.replace('/register')
        }
        dispatch(loggedIn(user))
        return history.replace('/')
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

export function submitRegistration () {

}
