const express = require('express')
const { protect, isAdmin } = require('../midlleware/auth')
const router = express.Router()
const categoryController = require('../controller/category')

// ...> / category
router.get('/', protect, categoryController.getCategory)
router.post('/', protect, isAdmin, categoryController.insertCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
