const pool = require('../config/db')
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM category LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
      // console.log(result);
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const insert = ({ id, name }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO category(id, name)VALUES($1, $2)', [id, name], (err, result) => {
      // console.log(result);
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const update = ({id, name}) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE category SET name = $1 WHERE id = $2', [name, id], (err, result) => {
      // console.log(result);
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const remove = (id) => {
  return pool.query('DELETE FROM category WHERE id = $1', [id])
}

const countCategory = () => {
  return pool.query('SELECT COUNT(*) AS total from category')
}

// const searchCategory = (keyword) => {
//   return pool.query('SELECT * FROM category WHERE name = $1', [keyword])
// }

module.exports = {
  select,
  insert,
  update,
  remove,
  countCategory
  // searchCategory
}
