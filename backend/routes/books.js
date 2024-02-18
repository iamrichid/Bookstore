const express = require('express')
const router = express.Router();

const controller = require('../controller/booksController');


router.get('/allbooks', controller.getAllBooks)
router.post('/newbook', controller.createNewBook)
router.get('/getbook/:id', controller.getBook)
router.delete('/deletebook/:id', controller.deletebook)
router.put('/updatebook', controller.updateBook)


module.exports = router;
