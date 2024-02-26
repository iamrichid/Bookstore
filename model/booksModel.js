const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
   title: {
    type: String,
    required: true
   },

   description: {
    type: String,
    required: true
   },

   image: {
      type: String,
     },

   quantity: {
    type: String,
    required: true
   },

   instock: {
    type: String,
    required: true
   },
});

module.exports = mongoose.model('Book', bookSchema);
