module.exports = {
  callback: process.env.CALLBACK,
  openingHour: process.env.OPENING_HOUR,
  closingHour: process.env.CLOSING_HOUR,
  minimumLength: process.env.MINIMUM_LENGTH,
  increment: process.env.INCREMENT,
  authDomain: process.env.AUTH_DOMAIN,
  authClientId: process.env.AUTH_CLIENT_ID,
  mongoDbUri: process.env.MONGODB_URI,
  gmailAddress: process.env.GMAIL_ADDRESS,
  gmailPassword: process.env.GMAIL_PASSWORD
}
