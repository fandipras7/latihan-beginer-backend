/* eslint-disable camelcase */
const pool = require('../config/db')

const create = ({ name, price, description, stock, id_category, photo }) => {
  return pool.query('INSERT INTO products(name, price, description, stock, id_category, photo)VALUES($1, $2, $3, $4, $5, $6)', [name, price, description, stock, id_category, photo])
}

module.exports = create
