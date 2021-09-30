const mongoose = require("mongoose");

//Create publication schema

const authorSchema = mongoose.Schema(
{
    id:Number,
    name:Number,
    books:[String]
}
);

const authorModel = mongoose.model("author",authorSchema);

module.exports = authorModel;
