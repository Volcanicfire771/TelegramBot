const axios = require('axios');
const cheerio = require('cheerio');
//https://elcinema.com/en/now/eg?utf8=%E2%9C%93&experience=&language=ja&censorship=&genre=3&order=release_date

//https://elcinema.com/en/now/

async function getHTML(type) {
    const url = filter_types(type);
    const {data: html} = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
        },
    });
    // console.log(html);
    return html;
}

async function scrapeMovies(type) {
    const res = await getHTML(type);
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

function filter_types(type){
    
        
        if(type == 1){
            return "https://elcinema.com/en/now/";   
        }
        else if(type == 2){
            return "https://elcinema.com/en/soon/";
        }
        // else if(type == 13){
        //     return "https://elcinema.com/en/now/eg?utf8=✓&experience=&language=ja&censorship=&genre=&order=release_date";   
        // }
        // else if(type == 23){
        //     return "https://elcinema.com/en/soon/eg?utf8=✓&experience=&language=ja&censorship=&genre=&order=release_date";   
        // }
}



module.exports = { filter_types }

module.exports = { scrapeMovies }