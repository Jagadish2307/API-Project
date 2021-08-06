const express = require("express");

//Database

const database = require("./database")

//INITIALIZE
const booky = express();

/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/",(req,res) =>{
   return res.json({books: database.books});
});

/*
Route            /
Description      Get specific book on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn",(req,res)=> {
    const getSpecificbook = database.books.filter(
        (book) => book.ISBN === req.params.isbn 
    )

    if(getSpecificbook.length === 0) {
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


booky.get("/c/:category",(req,res) => {
   const getSpecificbook = database.books.filter(
       (book) => book.category.includes(req.params.category)
   )

   if(getSpecificbook.length === 0){
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



booky.get("/l/:lang",(req,res) => {
    const getSpecifiedBook = database.books.filter(
      (book) => book.lang.includes(req.params.lang)
    )

    if(getSpecifiedBook.lenght === 0){
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


booky.get("/author",(req,res) => {
   return res.json({author: database.author});
});

/*
Route            /author/id
Description      Get all authors based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/author/:id",(req,res) => {
    const getSpecifiedAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    )

    if(getSpecifiedAuthor.length === 0){
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
   const getSpecifiedAuthor = database.author.filter(
       (author) => author.books.includes(req.params.isbn)
   )

   if(getSpecifiedAuthor.length === 0){
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

booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
});


/*
Route            /publications
Description      Get specified publications
Access           PUBLIC
Parameter        name
Methods          GET
*/


booky.get("/publications/:name",(req,res) => {
    const getSpecifiedPub = database.publication.filter(
        (publication) => publication.name === (req.params.name)
    )

    if(getSpecifiedPub === 0){
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
    const getSpecificPublication = database.publication.filter(
      (publication) => publication.books.includes(req.params.isbn)
    );
  
  if(getSpecificPublication.length === 0){
    return res.json({
      error: `No Publication found for the book of ${req.params.isbn}`
    });
  }
  return res.json ({publications: getSpecificPublication});
  });

booky.listen(3000,() => {
    console.log("Server is up and running");
});