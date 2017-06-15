import auth0 from 'auth0-js'

const auth0Domain = 'luke-davison.au.auth0.com'
const auth0ClientId = 'WCPEyjdLQW37sKZfBMFYNNisB6oyrGdD'
const auth0CallbackUrl = 'http://localhost:3000/callback'

export default function setUp () {
  const auth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientId,
    redirectUri: auth0CallbackUrl,
    audience: `https://${auth0Domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  })
  return auth
}
