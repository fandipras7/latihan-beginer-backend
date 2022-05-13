const express = require('express')
const router = express.Router()
const productsController = require('../controller/product')
const { protect } = require('../midlleware/auth')
const { upload } = require('../midlleware/upload')

router.get('/', protect, productsController.gerProduct)
router.post('/', protect, upload.single('photo'), productsController.insert)
router.put('/:id', productsController.update)
router.delete('/:id', productsController.delete)

module.exports = router
