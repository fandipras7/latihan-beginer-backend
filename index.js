require('dotenv').config()
// const productController = require('./src/controller/product')
// const categoryController = require('./src/controller/category')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const createError = require('http-errors')
const mainRoute = require('./src/routes')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

// router
app.use('/v1', mainRoute)
app.use('/img', express.static('./imageUpload'))
// app.use('/category', categoryRouter)
// app.use('/products', productRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'Internal server error'
  const statusCode = err.status || 500
  res.status(statusCode).json({
    message: messError
  })
})

// app.use(myMidlle)

// app.get('/helo', commonMid.myMidlle, (req, res, next) => {
//     res.json({
//         message: 'Hellow world'
//     })
// })

// product
// app.get('/products', productController.gerProduct)
// app.post('/products', commonMid.validate, productController.insert)
// app.put('/products/:id', productController.update)
// app.delete('/products/:idProduct', productController.delete)

// category
// app.get('/category', categoryController.getCategory)
// app.post('/category', categoryController.insertCategory)
// app.put('/category/:id', categoryController.updateCategory)
// app.delete('/category/:id', categoryController.deleteCategory)

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})

// Eslint
// npm install --save-dev eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n
