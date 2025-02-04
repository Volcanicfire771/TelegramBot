const sqlite3 = require("sqlite3").verbose();
const { scrapeMovies } = require("../movie_scraper/index.js");
let sql;

const db = new sqlite3.Database("./features/Database/test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

let titles = scrapeMovies("https://elcinema.com/en/now/");

sql = `INSERT INTO movies(movie) VALUES (?)`;
for(let i = 0; i < titles.length;i++){
    db.run(
        sql,
        [titles[i]],
        (err) => {
            if (err) return console.error(err.message);
        }
    );

}
