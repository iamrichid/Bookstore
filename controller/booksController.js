const Book = require('../model/booksModel');

const getAllBooks = async (req, res) => { // Corrected parameter order
    const books = await Book.find();
    if (!books || books.length === 0) // Check if books array is empty
        return res.status(204).json({ 'message': 'No books found!' });
    res.json(books);
};

const createNewBook = async (req, res) => { 
    
    if (!req?.body?.title || !req?.body?.description || !req?.body?.quantity) { // Fixed syntax error, changed || to &&
        return res.status(400).json({ 'message': 'Title, description, and quantity are required fields!' }); // Added response when conditions are not met
    }
    try{
        const imageName = req.file.filename
        const result = await Book.create({
                title : req.body.title,
                description : req.body.description,
                image: imageName, 
                quantity : req.body.quantity,
                instock : req.body.instock,
         })

         res.status(201).json(req.body);
         console.log('new book added successfully')
    }
        catch(err){
            console.log(err)
        }
    }
  
   const updateBook = async (req,res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message' : 'ID parameter required!'})
    }

    const book = await Book.findOne({_id: req.body.id}).exec();
    if(!book){
        return res.status(204).json({'message' : 'book not found'})
    }

    if(req.body?.title) book.title = req.body.title;
    if(req.body?.description) book.description = req.body.description;
    if(req.body?.picture) book.picture = req.body.picture;
    if(req.body?.quantity) book.quantity = req.body.quantity;
    if(req.body?.instock) book.instock = req.body.instock;

    const result = await book.save()
    res.json(result)
   } 

   const deletebook = async (req,res) => {
    if (!req?.params?.id) {
        return res.status(400).json({'message' : 'ID parameter required!'})
    }

    const book = await Book.findOne({_id: req.params.id}).exec();
    if(!book){
        return res.status(204).json({'message' : 'book not found'})
    }

    const result = await book.deleteOne();
    res.json(result)
   }

   const getBook = async (req,res) => {
    if (!req?.params?.id)
    return res.status(400).json({'message' : 'ID parameter required!'})

    const book = await Book.findOne({_id: req.params.id}).exec();
    if(!book){
        return res.status(204).json({'message' : 'book not found'})
    }

    res.json(book)
   }


   module.exports = { getAllBooks, createNewBook, updateBook, deletebook, getBook };
