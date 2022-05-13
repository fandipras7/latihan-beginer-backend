// const query = require('express/lib/middleware/query')
const createError = require('http-errors')
const pool = require('../config/db')

const myMidlle = (req, res, next) => {
  console.log('print hello world')
  // res.send(bla bla)
  next()
}

const validate = (req, res, next) => {
  const stock = req.body.stock

  if (stock < 1) {
    res.json({
      message: 'stock harus lebih dari 0'
    })
  }

  next()
}

const searchName = (req, res, next) => {
  const key = req.query.search || 0
  console.log(key)
  if (key) {
    pool.query('SELECT*FROM category WHERE name ILIKE $1', [key])
      .then((result) => {
        console.log(result)
        res.json({
          data: result.rows
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError.InternalServerError())
      })
    console.log('ini di eksekusi')
    return
  }

  next()
}

module.exports = {
  myMidlle,
  validate,
  searchName
}
