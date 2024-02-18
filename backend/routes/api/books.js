const express = require('express')
const router = express.Router();

const controller = require('../../controller/booksController');

router.route('/')
      .get(controller.getAllBooks)
      .post(controller.createNewBook)
      .delete(controller.deletebook)
      .put(controller.updateBook)

router.route('/:id')
      .get(controller.getBook)
   
module.exports = router;
