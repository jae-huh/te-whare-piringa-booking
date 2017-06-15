const express = require('express')
const router = require('./api-router')
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const strategy = new Auth0Strategy({
  domain: 'your-domain.auth0.com',
  clientID: 'your-client-id',
  clientSecret: 'your-client-secret',
  callbackURL: '/callback'
},
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile)
  })

passport.use(strategy)

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api/v1/', router)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app
 
