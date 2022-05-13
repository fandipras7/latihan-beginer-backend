const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verivyOption = { expiresIn: '1h' }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verivyOption)
  return token
}

module.exports = { generateToken }
