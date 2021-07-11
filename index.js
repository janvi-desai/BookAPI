require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Database
const databse = require("./database");

// models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/pulication");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initialization
const Booky = express();

//configuration
Booky.use(express.json());

// Establish database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("connection established!!!!!!!!"));

// Initializing microservices
Booky.use("/book", Books);
Booky.use("/author", Authors);
Booky.use("/publication", Publications);

Booky.listen(3000, () => console.log("Hey, server is running !!"));


// Talk to mongoDB in which mongoDB understands =>   *********
// talk to us in the way we understand  => JavaScript

// Mongoose

// HTTP client => { client means helper.. } -> helper who helps you to make http request

// why schema ?

// mongoDB is schemaless

// mongoose helps you with validation , relationship with other data -> mongoose is only for mongoDB

// mongoose model is represent -> document model of mongoDB

// First create .. Schema -> then convert into monggose model -> then use the model