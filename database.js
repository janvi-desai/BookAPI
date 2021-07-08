const books = [
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
        books: [],
    },
];

module.exports = {books, authors, publications};