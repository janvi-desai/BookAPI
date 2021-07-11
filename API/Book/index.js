// Prefix  : /book

// Router

//Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");

/** 
 * Route            /
 * Description      Get all books
 * Access           PUBLIC
 * Parameter        None
 * Methods          GET
*/

// Where Data ????...

Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/** 
 * Route            /:isbn
 * Description      Get specific books based on isbn
 * Access           PUBLIC
 * Parameter        isbn
 * Methods          GET
*/

Router.get("/isbn/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
    // null -> fasle.. value -> true

    // const getSpecificBook = databse.books.filter((book) => book.ISBN === req.params.isbn);

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`
        });
    }

    return res.json({ book: getSpecificBook });

});

/** 
 * Route            /base/id
 * Description      Get specific books based on author
 * Access           PUBLIC
 * Parameter        author
 * Methods          GET
*/

Router.get("/base/:id", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ author: req.params.id });

    if (!getSpecificBook) {
        return res.json({ Error: `no book found base on ${req.params.id}` });
    }
    return res.json({ book: getSpecificBook });
});

/** 
 * Route            /c
 * Description      Get specific books based on category
 * Access           PUBLIC
 * Parameter        category
 * Methods          GET
*/

Router.get("/c/:category", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ category: req.params.category });

    // const getSpecificBook = databse.books.filter((book) => book.category.includes(req.params.category));

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.category}`
        });
    }

    return res.json({ book: getSpecificBook });

});

/** 
 * Route            /l
 * Description      Get specific books based on langauge
 * Access           PUBLIC
 * Parameter        langauge
 * Methods          GET
*/

Router.get("/l/:langauge", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ langauge: req.params.langauge });

    // const getSpecificBook = databse.books.filter((book) => book.langauge === req.params.langauge);

    if (!getSpecificBook) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.langauge}`
        });
    }

    return res.json({ book: getSpecificBook });

});

/** 
 * Route            /book/add
 * Description      add new book
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

Router.post("/add", async (req, res) => {
    const { newBook } = req.body;

    const addNewBook = BookModel.create(newBook);

    //databse.books.push(newBook);

    return res.json({ books: addNewBook, message: "Book was added!!" });
});

/** 
 * Route            /book/update/title
 * Description      Update book title
 * Access           PUBLIC
 * Parameter        ISBN
 * Methods          PUT
*/

Router.put("/update/title/:isbn", async (req, res) => {
    const UpdateBook = await BookModel.findOneAndUpdate({ ISBN: req.params.isbn, }, { title: req.body.newBookTitle, }, { new: true, });

    // forEach ..  is do direct update.
    // databse.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title = req.body.newBookTitle;
    //         return;
    //     }
    // });

    return res.json({ books: UpdateBook });
    // map .. is create new array for changes.
});


//------------------------------ERROR------------------ERROR--------------------ERROR-------------------------------

/** 
 * Route            /book/update/author
 * Description      Update/add new author
 * Access           PUBLIC
 * Parameter        ISBN
 * Methods          PUT
*/

Router.put("/update/author/:isbn", async (req, res) => {

    // Update book database
    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
        {
            $push: {
                author: req.params.newAuthor,
            },
        },
        {
            new: true,
        });

    // databse.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.authors.push(req.body.newAuthor);
    //     }
    // });

    // Update author database
    const updateAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.newAuthor,
    },
        {
            $addToSet: {
                books: req.params.isbn,
            },
        },
        {
            new: true
        })

    // databse.authors.forEach((author) => {
    //     if (author.id === req.body.newAuthor) {
    //         return author.book.push(req.params.isbn);
    //     }
    // });

    return res.json({ books: updateBook, author: updateAuthor, Message: "new author updated." });
});
//------------------------------ERROR------------------ERROR--------------------ERROR-------------------------------

/** 
 * Route            /book/delete
 * Description      Delete a book
 * Access           PUBLIC
 * Parameter        ISBN
 * Methods          DELETE
 * 
*/

Router.delete("/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({ ISBN: req.params.isbn });

    // Replace the whole database

    // const updatedBookDatabase = databse.books.filter((book) =>
    //     book.ISBN !== req.params.isbn);
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    // databse.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase });
    // Edit at single point directly to master object
});

/** 
 * Route            /book/delete/author
 * Description      Delete a author and book bt isbn
 * Access           PUBLIC
 * Parameter        ISBN AuthorId
 * Methods          DELETE
 * 
*/

Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {


    // update the book database
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    },
        {
            $pull: {
                author: parseInt(req.params.authorId),
            },
        },
        {
            new: true
        });

    // databse.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newAuthorList = book.author.filter((author) => author !== parseInt(req.params.authorId));
    //         book.author = newAuthorList;
    //         return;
    //     }
    // });

    // update the author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.params.authorId),
    },
        {
            $pull: {
                books: req.params.isbn
            },
        },
        {
            new: true,
        });
    // databse.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId)) {
    //         const newBookList = author.books.filter((book) => book !== req.params.isbn);
    //         author.books = newBookList;
    //         return;
    //     };
    // });

    return res.json({ book:updatedBook, author: updatedAuthor, message: "Author was deleted!!!!!" });
});

/** 
 * Route            /book/delete/publication
 * Description      Delete a author and book bt isbn
 * Access           PUBLIC
 * Parameter        ISBN PubId
 * Methods          DELETE
 * 
*/

Router.delete("/delete/publication/:isbn/:pubId", async (req, res) => {
    // update the book database

    const updateBookdatabase = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    },
    {
        $pull: {
            publication: parseInt(req.params.pubId),
        },
    },
    {
        new: true
    });

    // databse.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const newPubList = book.publication.filter((publication) => publication !== parseInt(req.params.pubId));
    //         book.publication = newPubList;
    //         return;
    //     }
    // });

    // update the author database
    const updatePublication = await PublicationModel.findOneAndUpdate({
        id: parseInt(req.params.pubId)
    },
    {
        $pull: {
            books: req.params.isbn
        },
    },
    {
        new: true,
    });

    // databse.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.pubId)) {
    //         const newBookList = publication.books.filter((book) => book !== req.params.isbn);
    //         publication.books = newBookList;
    //         return;
    //     };
    // });

    return res.json({ book: updateBookdatabase, publication: updatePublication, message: "Publication was deleted!!!!!" });
});

module.exports = Router;