const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcryptjs')
const { findByEmail, create } = require('../models/users')
const commonHelper = require('../helper/common')
// const jwt = require('jsonwebtoken')
const autHelper = require('../helper/auth')

const register = async (req, res, next) => {
  try {
    const { email, password, fullname, role } = req.body
    const { rowCount } = await findByEmail(email)
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    console.log(salt)
    if (rowCount) {
      return next(createError(403, 'Useer sudah terdaftar'))
    }
    const data = {
      id: uuidv4(),
      email,
      password: hashPassword,
      fullname,
      role: role || 'user'
    }

    await create(data)
    commonHelper.response(res, null, 201, 'user berhasil register')
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [user] } = await findByEmail(email)
    console.log(user)
    if (!user) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    // console.log(validPassword)
    if (!validPassword) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password

    const payload = {
      email: user.email,
      role: user.role
    }

    // generate token

    user.token = autHelper.generateToken(payload)

    commonHelper.response(res, user, 201, 'Anda berhasil Login')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const profile = async (req, res, next) => {
  try {
    // console.log(req.user)
    const email = req.user.email
    const { rows: [user] } = await findByEmail(email)
    delete user.password
    commonHelper.response(res, user, 200)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  register,
  login,
  profile
}
