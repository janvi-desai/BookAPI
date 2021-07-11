// Prefix  : /author

// Router

//Initializing Express Router
const Router = require("express").Router();

// Database Models
const AuthorModel = require("../../database/author");


/** 
 * Route            /author
 * Description      Get all author
 * Access           PUBLIC
 * Parameter        none
 * Methods          GET
*/

Router.get("/", (req, res) => {

    return res.json({ author: databse.authors });

});

/** 
 * Route            /author
 * Description      Get author according id
 * Access           PUBLIC
 * Parameter        id
 * Methods          GET
*/

Router.get("/:id", (req, res) => {
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

Router.get("/book/:isbn", (req, res) => {
    const getSpecificAuthor = databse.authors.filter((author) => author.books.includes(req.params.isbn));

    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No Author found for the ISBN of ${req.params.isbn}`
        });
    }

    return res.json({ book: getSpecificAuthor });

});

/** 
 * Route            /author/add
 * Description      add new author
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

Router.post("/add", async (req, res) => {
    const { newAuthor } = req.body;

    AuthorModel.create(newAuthor);

    // databse.authors.push(newAuthor);

    return res.json({ Message: "Author is added." });
});

/** 
 * Route            /author/update/name
 * Description      Update author name
 * Access           PUBLIC
 * Parameter        ID
 * Methods          PUT
*/

Router.put("/update/name/:id", (req, res) => {
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
 * Route            /author/delete
 * Description      Delete a author
 * Access           PUBLIC
 * Parameter        id
 * Methods          DELETE
 * 
*/

Router.delete("/delete/:id", async (req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: parseInt(req.params.id)
    })
    // Replace the whole database

   // const updatedAuthorDatabase = databse.authors.filter((author) =>
       // author.id !== parseInt(req.params.id));
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    databse.authors = updatedAuthorDatabase;
    return res.json({ authors: databse.authors, message: "delete author" });
    // Edit at single point directly to master object
});


module.exports = Router;