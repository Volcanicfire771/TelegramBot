const axios = require('axios');
const cheerio = require('cheerio');
//https://elcinema.com/en/now/eg?utf8=%E2%9C%93&experience=&language=ja&censorship=&genre=3&order=release_date
const url = filter_types();
//https://elcinema.com/en/now/

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

function filter_types(msg){
    if(msg.includes("movies") === true){
        
        


        if(msg.includes("currently available")){
            let url = "https://elcinema.com/en/now/";
        }
        else if(msg.includes("coming soon")){
            let url = "https://elcinema.com/en/soon/";
        }

        if(msg.includes("anime")){
            url.append("eg?utf8=✓&experience=&language=ja&censorship=&genre=&order=release_date") 
        }
}
    return url;
}





module.exports = { scrapeMovies }