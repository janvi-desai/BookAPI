let books = [
    {
        ISBN: "12345Book",
        title: "Getting started with MERN",
        pubDate: "2021-07-07",
        langauge: "en",
        numPage: 250,
        author: [1,2],
        publication: [1],
        category: ["tech", "Programming", "Education", "triller",]
    },
    {
        ISBN: "123Success",
        title: "Getting started with SuccessRule",
        pubDate: "2020-11-20",
        langauge: "en",
        numPage: 300,
        author: [2],
        publication: [2,3],
        category: ["Goal", "Success", "Life", "triller",]
    },
];

const authors = [
    {
        id: 1,
        name: "Vallabh Devani",
        books: ["12345Book","12Hello"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book","123Success"],
    },
];

const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Goalfirex",
        books: ["123Success"],
    },
    {
        id: 3,
        name: "firebase",
        books: ["12Hello"],
    },
];

module.exports = {books, authors, publications};