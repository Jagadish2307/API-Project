require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

var bodyParser = require("body-parser")
//Database

const database = require("./database/database");

//model

const bookModel = require("./database/books");
const authorModel = require("./database/author");
const publicationModel = require("./database/publication");


//INITIALIZE
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());


mongoose.connect(process.env.BOOK_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(() => console.log(" Connection Established"));


//GET

/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/", async (req,res) =>{
   const getAllbooks = await bookModel.find();
   return res.json(getAllbooks);
});

/*
Route            /
Description      Get specific book on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn", async (req,res)=> {
    const getSpecified = await bookModel.findOne({ISBN: req.params.isbn})

    if(!getSpecified) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
      }

    return res.json({book: getSpecificbook})

});

/*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/


booky.get("/c/:category",async (req,res) => {
   const getSpecifiedbook = await bookModel.findOne({category: req.params.category})

   if(!getSpecificbook){
       return res.json({error:`No book found for the category of ${req.params.category}`});
   }

   return res.json({book: getSpecificbook});
});

/*
Route            /l
Description      Get specific book on languages
Access           PUBLIC
Parameter        lang
Methods          GET
*/



booky.get("/l/:lang", async (req,res) => {
    const getSpecifiedBook = await bookModel.findOne({language: req.params.lang})

    if(!getSpecifiedBook){
        return res.json({error:`no book found for the language of ${req.params.lang}`});
    }

    return res.json({lang: getSpecifiedBook});
});

/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/


booky.get("/author",async (req,res) => {
  const getAllAuthor = await authorModel.find();
   return res.json(getAllAuthor);
});

/*
Route            /author/id
Description      Get all authors based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/author/:id", async (req,res) => {
    const getSpecifiedAuthor = await authorModel.findOne({id: req.params.id}) 
    

    if(!getSpecifiedAuthor){
        return res.json({error:`no author found on your id ${req.params.id}`});
    }

    return res.json({author: getSpecifiedAuthor});
});

/*
Route            /author/book
Description      Get all authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/author/book/:isbn",(req,res) => {
   const getSpecifiedAuthor = await authorModel.findOne({isbn:req.params.isbn});

   if(!getSpecifiedAuthor){
       return res.json({error:`no book found for the category of ${req.params.isbn}`});
   }

   return res.json({authors: getSpecifiedAuthor});
});


/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications",async (req,res) => {
    const getAllPublication = await publicationModel.find();
    return res.json(getAllPublication);
});


/*
Route            /publications
Description      Get specified publications
Access           PUBLIC
Parameter        name
Methods          GET
*/


booky.get("/publications/:name",(req,res) => {
    const getSpecifiedPub = await publicationModel.findOne({name: req.params.name});

    if(!getSpecifiedPub){
        return res.json({error:`No publication found of your name ${req.params.name}`});
    }

    return res.json({publication: getSpecifiedPub});
});

/*
Route            /publications/book
Description      Get specified publications based on a book
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/publications/book/:isbn",(req,res)=>{
    const getSpecificPublication = await publicationModel.findOne({isbn: req.params.isbn});
  
  if(!getSpecificPublication){
    return res.json({error: `No Publication found for the book of ${req.params.isbn}`});
  }
  return res.json ({publications: getSpecificPublication});
  });

//Post

/*
Route            /books/new
Description      Get a new book 
Access           PUBLIC
Parameter        none
Methods          Post
*/

booky.post("/books/new", async (req,res) => {
   const { newBook } = req.body;
   const addNewBook = bookModel.create(newBook);
   return res.json({books: addNewBook,message:"Added successfully"});
});

/*
Route            /author/new
Description      Add a author's name
Access           PUBLIC
Parameter        None
Methods          Post
*/

booky.post("/author/new", async (req,res) => {
   const { newAuthor } = req.body;
   const addNewAuthor = authorModel.create(newAuthor);
   return res.json({author: addNewAuthor,message:"Author Added Successfully!!"});
});

/*
Route            /publication/new
Description      Get a new publication
Access           PUBLIC
Parameter        None
Methods          Post
*/

booky.post("/publication/new", async (req,res) => {
    const { newPublication } = req.body;
    const addNewPublication = publicationModel.create(newPublication);
    return res.json({publication: addNewPublication,message: "Publication Added!" });
});

/*
Route            /publication/new
Description      Get a new publication
Access           PUBLIC
Parameter        None
Methods          Post
*/


// booky.put("/publication/books/update/:isbn",(req,res) => {

// //Update in Publications
//    database.publication.forEach((pub) => {
//        if(pub.id === req.body.PubId) {
//            return pub.book.push(req.params.isbn)
//        }
// });
 

// //Update in books 
// database.books.forEach((book) => {
//     if(book.ISBN === req.params.isbn){
//        book.publication = req.body.PubId;
//        return;
//     }
// });

// // returning
// return res.json({
//     books: database.books,
//     publication:database.publication,
//     message: "Succesfully updates!!"
// })

// });

booky.put("/publication/update/book/:isbn", (req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
      if(pub.id === req.body.pubId) {
        return pub.books.push(req.params.isbn);
      }
    });
  
    //Update the book database
    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn) {
        book.publications = req.body.pubId;
        return;
      }
    });
  
    return res.json(
      {
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
      }
    );
  });

  //DELETE

  /*
Route            /book/publication
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          delete
*/


   booky.delete("/book/delete/:isbn", (req, res) => {
   // Whichever book that does not match with the isbn, just send it to updatedBookDatabase array and rest will be filtered out
   const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
   database.books = updatedBookDatabase;
      
   return res.json({books: database.books});
  });
      

      
  /*
Route            /book/publication
Description      delete a book with authorid
Access           PUBLIC
Parameter        isbn
Methods          delete
*/


booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
// Update the book database
 database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter((eachAuthor) => eachAuthor !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
       }
       });
      
        // Update the author database
    database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
    const newBookList = eachAuthor.books.filter((book) => book !== req.params.isbn);
     eachAuthor.books = newBookList;
            return;
          }
        });
      
        return res.json({
          books: database.books,
          author: database.author,
          message: "Author was deleted"
        });
      });


booky.listen(3000,() => {
    console.log("Server is up and running");
});