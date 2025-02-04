const sqlite3 = require("sqlite3").verbose();
const scrapeMovies = require("../movie_scraper/index.js");
let sql;

const db = new sqlite3.Database("./features/Database/test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

let ahmed = scrapeMovies("https://elcinema.com/en/now/");

console.log(ahmed);


db.run(sql);