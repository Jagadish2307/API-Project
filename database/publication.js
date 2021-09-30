const mongoose = require("mongoose");

//Create publication schema

const publicationSchema = mongoose.Schema(
{
    id:Number,
    name:String,
    books: [String]
}
);

const publicationModel = mongoose.model("publication",publicationSchema);

module.exports = publicationModel;

