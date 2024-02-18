const mongoose = require('mongoose');


const connectDB = async () => {
    const uri = 'mongodb://127.0.0.1:27017/bookstore'
    try {
         await mongoose.connect (uri);
    } catch(err){
        console.log(err)
    }
}

module.exports = connectDB