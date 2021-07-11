// Prefix  : /publication

// Router

//Initializing Express Router
const Router = require("express").Router();

// Database Models
const PublicationModel = require("../../database/pulication");



/** 
 * Route            /publication
 * Description      Get all publication
 * Access           PUBLIC
 * Parameter        none
 * Methods          GET
*/

Router.get("/", async (req, res) => {

    const pulication = await PublicationModel.find();

    return res.json({ author: pulication });

});

/** 
 * Route            /publication
 * Description      Get publication according id
 * Access           PUBLIC
 * Parameter        id
 * Methods          GET
*/

Router.get("/:id", async (req, res) => {
    // const getPublications = databse.publications.filter((publication) => publication.id === parseInt(req.params.id));

    const getPublications = await PublicationModel.findOne({ id: req.params.id });

    if (!getPublications) {
        w2
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

Router.get("/book/:isbn", async (req, res) => {
    // const getSpecificPublication = databse.publications.filter((publication) => publication.books.includes(req.params.isbn));

    const getSpecificPublication = await PublicationModel.findOne({ books: req.params.isbn });

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the ISBN of ${req.params.isbn}`
        });
    }

    return res.json({ book: getSpecificPublication });
});

/** 
 * Route            /publication/update/book
 * Description      Update/add new book to a publication
 * Access           PUBLIC
 * Parameter        ISBN , ID
 * Methods          PUT
*/

Router.put("/update/book/:isbn", (req, res) => {

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
 * Route            /publication/add
 * Description      add new publication
 * Access           PUBLIC
 * Parameter        NONE
 * Methods          POST
*/

Router.post("/add", async (req, res) => {
    const { newPublication } = req.body;

    PublicationModel.create(newPublication);

    // databse.publications.push(newPublication);

    return res.json({ Message: "Publication is added. " });
});


/** 
 * Route            /publication/update/name
 * Description      Update publication name
 * Access           PUBLIC
 * Parameter        ID
 * Methods          PUT
 * 
*/

Router.put("/update/name/:id", (req, res) => {
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
 * Route            /publication/delete
 * Description      Delete a publication
 * Access           PUBLIC
 * Parameter        id
 * Methods          DELETE
 * 
*/

Router.delete("/delete/:id", async (req, res) => {


    const updatedPubDatabase = await PublicationModel.findOneAndDelete({ id: parseInt(req.params.id) });
    // Replace the whole database

    //const updatedPubDatabase = databse.publications.filter((publication) =>
      //  publication.id !== parseInt(req.params.id));
    // filter return new array.. so need to store data in new array that's why we need to generate new array
    databse.publications = updatedPubDatabase;
    return res.json({ publications: databse.publications, message: "delete publication" });
    // Edit at single point directly to master object
});


module.exports = Router;