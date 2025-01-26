const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://elcinema.com/en/now/eg?utf8=%E2%9C%93&experience=&language=ja&censorship=&genre=3&order=release_date';


async function getHTML() {
    const {data: html} = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
        },
    });
    // console.log(html);
    return html;
}

async function scrapeMovies() {
    const res = await getHTML();
    let movieData = [];

    const $ = cheerio.load(res);

    $('h3').each((i, element) => {
        const title = $(element).find('a').text().trim();
        if (title !== "") {
            movieData.push(title);
        }
    });

    // console.log(movieData);
    return movieData;
}





module.exports = { scrapeMovies }