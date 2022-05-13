const createError = require('http-errors')
const { response } = require('../helper/common')
const create = require('../models/products')

/* eslint-disable camelcase */
let products = [{
  id: 1,
  name: 'baju',
  price: 0,
  stock: 0
}]

const productController = {
  insert: async (req, res, next) => {
    try {
      console.log(req.file)
      const { name, price, description, stock, id_category } = req.body
      const data = {
        name,
        price,
        description,
        stock,
        id_category,
        photo: `http:://localhost:4000/img/${req.file.filename}`
        // photo: req.file.filename
      }

      await create(data)
      response(res, data, 201, 'berhasil di tambahkan')
    } catch (error) {
      console.log(error)
      next(new createError.InternalServerError())
    }
  },
  update: (req, res) => {
    const { name, price, stock } = req.body
    const id = req.params.id

    products = products.map((item) => {
      if (item.id === id) {
        const result = {
          id,
          name,
          price,
          stock
        }
        return result
      } else {
        return item
      }
    })

    res.json({
      message: 'data berhasil di update'
    })
  },
  delete: (req, res) => {
    const id = req.params.idProduct
    products = products.filter((item) => item.id !== id)

    res.json({
      message: 'adata berhasil di hapus dengan id ' + id
    })
  },
  gerProduct: (req, res) => {
    res.json({
      data: products,
      name: req.user
    })
  }
}

module.exports = productController
