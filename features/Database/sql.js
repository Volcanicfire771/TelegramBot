const sqlite3 = require("sqlite3").verbose();
const { scrapeMovies } = require("../movie_scraper/index.js");

const db = new sqlite3.Database("./features/Database/test.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

const insertMovies = async () => {
    try {
        let titles = await scrapeMovies(1); // Await the data
        // console.log(titles);

        let sql = `INSERT INTO movies(title) VALUES (?)`;
        for (let i = 0; i < titles.length; i++) {
            db.run(sql, [titles[i]], (err) => {
                if (err) return console.error(err.message);
            });
        }
    } catch (error) {
        console.error("Error scraping movies:", error);
    } finally {
        db.close(); // Close the database connection when done
    }
};

// Call the async function

async function compare(){
    let old_movies = await getMovies();
    let new_movies = await scrapeMovies(1);
    

    // Find removed movies (exist in old but not in new)
    let removedMovies = old_movies.filter(title => !new_movies.includes(title));

    // Find added movies (exist in new but not in old)
    let addedMovies = new_movies.filter(title => !old_movies.includes(title));

    // Log the results
    if (removedMovies.length > 0) {
        console.log("Removed Movies:", removedMovies);
        for(let i = 0; i < removedMovies.length;i++){
            let title = removedMovies[i];
            let sql = `DELETE FROM movies WHERE title = '${title}'`;
            db.run(sql);
        }
        
    } else {
        console.log("No movies were removed.");
    }

    if (addedMovies.length > 0) {
        console.log("New Movies Added:", addedMovies);
        for(let i = 0; i < addedMovies.length;i++){
            let title = addedMovies[i];
            let sql = `INSERT INTO movies(title) VALUES (?)`;
            db.run(sql, [title], (err) => {
                if (err) return console.error(err.message);
            });
        }
    } else {
        console.log("No new movies were added.");
    }

    
    
}

const getMovies = async () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT title FROM movies`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                let movies = rows.map(row => row.movie); // Extract movie column values into an array
                resolve(movies);
            }
        });
    });
};



module.exports = { compare }
// Run the function immediately and then every 24 hours
// compareMovies(); // Run once on startup
setInterval(compare, 10); // Run every 24 hours