const axios = require("axios");
const { scrapeMovies } = require("../movie_scraper/index.js");

const BIN_ID = "67a2641dad19ca34f8f9d2b4"; // Replace with your JSONBin.io Bin ID
const API_KEY = "$2a$10$orD.iDdbJhKlF6mRvXcjPOniaQonKhcacZL84ZI3uYvxzz3Bz400m"; // Replace with your JSONBin.io API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const getOldMovies = async () => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { "X-Master-Key": API_KEY }
        });
        return response.data.record.movies || [];
    } catch (error) {
        console.error("Error fetching old movies:", error);
        return [];
    }
};

const saveMovies = async (movies) => {
    try {
        await axios.put(BASE_URL, { movies }, {
            headers: { "X-Master-Key": API_KEY, "Content-Type": "application/json" }
        });
        console.log("Movies updated successfully!");
    } catch (error) {
        console.error("Error updating movies:", error);
    }
};

// Function to compare and log changes
const compareMovies = async () => {
    try {
        let oldMovies = await getOldMovies();
        let newMovies = await scrapeMovies(1);

        let removedMovies = oldMovies.filter(movie => !newMovies.includes(movie));
        let addedMovies = newMovies.filter(movie => !oldMovies.includes(movie));

        if (removedMovies.length > 0) return `Removed Movies: ${removedMovies}`;
        if (addedMovies.length > 0) return `Added Movies: ${addedMovies}`;
        if(removedMovies.length == 0 && addedMovies.length == 0) return "No New Movies";

        // Save updated movies list
        await saveMovies(newMovies);
    } catch (error) {
        console.error("Error comparing movies:", error);
    }
    return "Done";
};

// Run the comparison function
module.exports = { compareMovies }