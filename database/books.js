const mongoose = require("mongoose");

//Create book schema

const bookSchema = mongoose.Schema(
{
    ISBN:String,
    title:String,
    pubDate:String,
    lang:String,
    numPage:Number,
    author:[Number],
    publication:[Number],
    category:[String]
}
);

const bookModel = mongoose.model("books",bookSchema);

module.exports = bookModel;

