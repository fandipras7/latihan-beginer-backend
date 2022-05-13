// const pool = require('../config/db')
const categoryModel = require('../models/category')
const createError = require('http-errors')
const errorMess = new createError.InternalServerError()
const commonHelper = require('../helper/common')
exports.getCategory = async (req, res, next) => {
  console.log('apakah nextGet dijalankan')
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const offset = (page - 1) * limit
    const result = await categoryModel.select({ offset, limit })

    // pagination
    const { rows: [count] } = await categoryModel.countCategory()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)
    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }

    // res.status(200).json({
    //   pagination: {
    //     currentPage: page,
    //     limit,
    //     totalData,
    //     totalPage
    //   },
    //   data: result
    // })

    commonHelper.response(res, result, 200, 'Data berhasil ditambahkan', pagination)
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }

  // categoryModel.select()
  //   .then((result) => {
  //     res.status(200)
  //     res.json({
  //       data: result
  //     })
  //   })
  //   .catch(() => {
  //     next(error)
  //   })
}

exports.insertCategory = (req, res, next) => {
  const { id, name } = req.body
  const data = {
    id,
    name
  }
  categoryModel.insert(data)
    .then(() => {
      // res.status(201)
      // res.json({
      //   data
      // })
      commonHelper.response(res, data, 201, 'Data berhasil di update')
    })
    .catch((error) => {
      console.log(error)
    // cara 1
    //   const error = new Error('ada error di insert category')
    //   error.status = 500
    //   next(error)
    // Cara2
    // next({message: 'ada error bro', status: 500})
    // Cara 3
    //   next(createError(500, 'Ada error di unput anda'))
      next(errorMess)
    })
}
exports.updateCategory = (req, res, next) => {
  const id = req.body.id
  const name = req.body.name
  // pool.query('UPDATE category SET name = $1 WHERE id = $2', [name, id], (err, result) => {
  //   // console.log(result);
  //   if (!err) {
  //     // res.json({
  //     //   message: result
  //     // })

  //     commonHelper.response(res, result, 201, 'Data berhasil di update')
  //   } else {
  //     next(error)
  //   }
  // })
  const data = {
    id,
    name
  }

  categoryModel.update(data)
    .then(() => {
      commonHelper.response(res, data, 201, 'Data berhasil di update')
    })
    .catch((error) => {
      console.log(error)
      next(errorMess)
    })
}

exports.deleteCategory = (req, res, next) => {
  const id = req.params.id
  console.log(typeof (id))
  categoryModel.remove(id)
    .then(() => {
      res.json({
        message: 'Data berhasil dihapus'
      })
    })
    .catch(() => {
      next(errorMess)
    })
  // pool.query("DELETE FROM category WHERE id = $1", [], (err, result) => {
  //     // console.log(result);
  //     if (!err) {
  //         res.json({
  //             message: result
  //         })
  //     } else {
  //         res.json({
  //             message: 'internal server error'
  //         })
  //     }
  // })
}
