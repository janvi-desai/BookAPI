const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    pubDate: String,
    langauge: String,
    numPage: Number,
    author: [Number],
    publication: [Number],
    category: [String],
});

// creating a book model
const BookModel = mongoose.model("books",BookSchema);

// model => document model of mongoDB

module.exports = BookModel;