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

   picture: {
    type: String,
    required: true
   },

   quantity: {
    type: String,
    required: true
   },

   instock: {
    type: String,
    required: true
   },
})

module.exports = mongoose.model('books',bookSchema)