const express = require("express");

// Database
const databse = require("./database");

// Initialization
const booky = express();

//configuration
booky.use(express.json());

/** 
 * Route            /
 * Description      Get all books
 * Access           PUBLIC
 * Parameter        None
 * Methods          GET
*/

// Where Data ????...

booky.get("/", (req, res) => {
    return res.json({ books: databse.books });
});

/** 
 * Route            /:isbn
 * Description      Get specific books
 * Access           PUBLIC
 * Parameter        isbn
 * Methods          GET
*/

booky.get("/isbn/:isbn", (req, res) => {
    const getSpecificBook = databse.books.filter((book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`
        });
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

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = databse.books.filter((book) => book.category.includes(req.params.category));

    if (getSpecificBook.length === 0) {
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

booky.get("/l/:langauge", (req, res) => {
    const getSpecificBook = databse.books.filter((book) => book.langauge === req.params.langauge);

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.langauge}`
        });
    }

    return res.json({ book: getSpecificBook });

});

/** 
 * Route            /author
 * Description      Get all author
 * Access           PUBLIC
 * Parameter        none
 * Methods          GET
*/

booky.get("/author", (req, res) => {

    return res.json({ author: databse.authors });

});

/** 
 * Route            /author
 * Description      Get author according id
 * Access           PUBLIC
 * Parameter        id
 * Methods          GET
*/

booky.get("/author/:id", (req, res) => {
    const getAuthor = databse.authors.filter((author) => author.id === parseInt(req.params.id));

    if (getAuthor.length === 0) {
        return res.json({
            error: `No author found the id of ${req.params.id}`
        });
    }

    return res.json({ authors: getAuthor });
});

/** 
 * Route            /author/book
 * Description      Get author by book
 * Access           PUBLIC
 * Parameter        isbn
 * Methods          GET
*/

booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = databse.authors.filter((author) => author.books.includes(req.params.isbn));

    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No Author found for the ISBN of ${req.params.isbn}`
        });
    }

    return res.json({ book: getSpecificAuthor });

});

/** 
 * Route            /publication
 * Description      Get all publication
 * Access           PUBLIC
 * Parameter        none
 * Methods          GET
*/

booky.get("/publication", (req, res) => {

    return res.json({ author: databse.publications });

});

/** 
 * Route            /publication
 * Description      Get publication according id
 * Access           PUBLIC
 * Parameter        id
 * Methods          GET
*/

booky.get("/publications/:id", (req, res) => {
    const getPublications = databse.publications.filter((publication) => publication.id === parseInt(req.params.id));

    if (getPublications.length === 0) {
        return res.json({
            error: `No publication found the id of ${req.params.id}`
        });
    }

    return res.json({ publication: getPublications });
});

/** 
 * Route            /publication/book
 * Description      Get publication by book
 * Access           PUBLIC
 * Parameter        isbn
 * Methods          GET
*/

booky.get("/publications/book/:isbn", (req, res) => {
    const getSpecificPublication = databse.publications.filter((publication) => publication.books.includes(req.params.isbn));

    if (getSpecificPublication.length === 0) {
        return res.json({
            error: `No publication found for the ISBN of ${req.params.isbn}`
        });
    }

    return res.json({ book: getSpecificPublication });
});

/** 
 * Route            /book/add
 * Description      add new book
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

booky.post("/book/add", (req, res) => {
    const { newBook } = req.body;

    databse.books.push(newBook);

    return res.json({ books: databse.books });
});

/** 
 * Route            /author/add
 * Description      add new author
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;

    databse.authors.push(newAuthor);

    return res.json({ Authors: databse.authors });
});


/** 
 * Route            /publication/add
 * Description      add new publication
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

booky.post("/publication/add", (req, res) => {
    const { newPublication } = req.body;

    databse.publications.push(newPublication);

    return res.json({ Publications: databse.publications });
});

/** 
 * Route            /book/update/title
 * Description      Update book title
 * Access           PUBLIC
 * Parameter        ISBN
 * Methods          PUT
*/

booky.put("/book/update/title/:isbn", (req, res) => {
    // forEach ..  is do direct update.
    databse.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({ books: databse.books });
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

booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // Update book database
    databse.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    // Update author database
    databse.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorId)) {
            return author.book.push(req.params.isbn);
        }
    });

    return res.json({ books: databse.books, author: databse.authors });
});
//------------------------------ERROR------------------ERROR--------------------ERROR-------------------------------


/** 
 * Route            /publication/update/book
 * Description      Update/add new book to a publication
 * Access           PUBLIC
 * Parameter        ISBN , ID
 * Methods          PUT
*/

booky.put("/publication/update/book/:isbn", (req, res) => {

    // update the publication database
    databse.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update the book database
    databse.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({ books: databse.books, publications: databse.publications, message: "Successfully updated publication", });
});

/** 
 * Route            /author/update/name
 * Description      Update author name
 * Access           PUBLIC
 * Parameter        ID
 * Methods          PUT
*/

booky.put("/author/update/name/:id", (req, res) => {
    // forEach ..  is do direct update.
    databse.authors.forEach((author) => {
        if (author.id === parseInt(req.params.id)) {
            author.name = req.body.newAuthorName;
            return;
        }
    });

    return res.json({ authors: databse.authors });
    // map .. is create new array for changes.
});

/** 
 * Route            /publication/update/name
 * Description      Update publication name
 * Access           PUBLIC
 * Parameter        ID
 * Methods          PUT
 * 
*/

booky.put("/publication/update/name/:id", (req, res) => {
    // forEach ..  is do direct update.
    databse.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.id)) {
            publication.name = req.body.newPublicationName;
            return;
        }
    });

    return res.json({ publications: databse.publications });
    // map .. is create new array for changes.
});

/** 
 * Route            /book/delete
 * Description      Delete a book
 * Access           PUBLIC
 * Parameter        ISBN
 * Methods          DELETE
 * 
*/

booky.delete("/book/delete/:isbn", (req, res) => {

    // Replace the whole database

    const updatedBookDatabase = databse.books.filter((book) =>
        book.ISBN !== req.params.isbn);
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    databse.books = updatedBookDatabase;
    return res.json({ books: databse.books });
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

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the book database
    databse.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter((author) => author !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });
    
    // update the author database
    databse.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter((book) => book !== req.params.isbn);
            author.books = newBookList;
            return;
        };
    });

    return res.json ({book: databse.books, author: databse.authors, message: "Author was deleted!!!!!" });
});

/** 
 * Route            /author/delete
 * Description      Delete a author
 * Access           PUBLIC
 * Parameter        id
 * Methods          DELETE
 * 
*/

booky.delete("/author/delete/:id", (req, res) => {

    // Replace the whole database

    const updatedAuthorDatabase = databse.authors.filter((author) =>
        author.id !== parseInt(req.params.id));
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    databse.authors = updatedAuthorDatabase;
    return res.json({ authors: databse.authors, message: "delete author" });
    // Edit at single point directly to master object
});

/** 
 * Route            /publication/delete
 * Description      Delete a publication
 * Access           PUBLIC
 * Parameter        id
 * Methods          DELETE
 * 
*/

booky.delete("/publication/delete/:id", (req, res) => {

    // Replace the whole database

    const updatedPubDatabase = databse.publications.filter((publication) =>
    publication.id !== parseInt(req.params.id));
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    databse.publications = updatedPubDatabase;
    return res.json({ publications: databse.publications, message: "delete publication" });
    // Edit at single point directly to master object
});

/** 
 * Route            /book/delete/publication
 * Description      Delete a author and book bt isbn
 * Access           PUBLIC
 * Parameter        ISBN PubId
 * Methods          DELETE
 * 
*/

booky.delete("/book/delete/publication/:isbn/:pubId", (req, res) => {
    // update the book database
    databse.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newPubList = book.publication.filter((publication) => publication !== parseInt(req.params.pubId));
            book.publication = newPubList;
            return;
        }
    });
    
    // update the author database
    databse.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = newBookList;
            return;
        };
    });

    return res.json ({book: databse.books, publication: databse.publications, message: "Publication was deleted!!!!!" });
});

booky.listen(3000, () => console.log("Hey, server is running !!"));

// HTTP client => { client means helper.. } -> helper who helps you to make http request