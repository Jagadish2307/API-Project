const books = [
    {
        ISBN:"12345book",
        title:"peaky blinders",
        pubDate:"06-08-2021",
        lang:"en",
        numPage:250,
        author:[1,2],
        publication:[1],
        category:["drama","war"]
    },
    {
        ISBN:"12345love",
        title:"GOT",
        pubDate:"06-08-2021",
        lang:"spanish",
        numPage:250,
        author:[1],
        publication:[1],
        category:["drama","war","love"]
    }
]

const author = [
    {
        id:1,
        name:"Jagadish",
        books: ["12345book","breakingBad"]
    },
    {
        id:2,
        name:"Ashwin",
        books:["12345book","Roja"]
    },
    {
        id:3,
        name:"Gokul",
        books:["12345love","naruto"]
    }
]

const publication = [
    {
        id:1,
        name:"writex",
        books:["12345book"]
    },
    {
        id:2,
        name:"writon",
        books:[]
    },

]

module.exports ={books ,author ,publication};