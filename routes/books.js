const express = require('express')
const router = express.Router();
const multer = require('multer');
const controller = require('../controller/booksController');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../../frontend_react/src/images'); 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // Generate unique filename
  }
});

const upload = multer({storage : storage})
router.route('/')
      .get(controller.getAllBooks)
      .post(upload.single('image'),controller.createNewBook)
      .patch(controller.updateBook)

router.route('/:id')
      .get(controller.getBook)
      .delete(controller.deletebook)
   
module.exports = router;
