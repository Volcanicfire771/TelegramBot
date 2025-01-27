const sendMessage = require("../sendmessage");
const { scrapeMovies } = require("../features/movie_scraper/index.js");
const { filter_types } = require("../features/movie_scraper/index.js");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  let text = message.text;
  const chatID = message.chat.id;

//   console.log(message);
//   console.log(message.text);
    
    if(text.charAt(0) === "/"){

        const command = text.substr(1);
        
        switch (command){
            case "start":
                await sendMessage(chatID, "Starting");
                break;
            case "current_movies":
                movieData = await scrapeMovies(1);
                await sendMessage(chatID,`Movies currently airing are: \n${movieData}`);
            case "soon_movies":
                movieData = await scrapeMovies(2);
                await sendMessage(chatID,`Movies will aire soon are: \n${movieData}`);
            case "animenow":
                movieData = await scrapeMovies(13);
                await sendMessage(chatID,`Anime Movies currently airing are: \n${movieData}`);
            case "animesoon":
                movieData = await scrapeMovies(23);
                await sendMessage(chatID,`Anime Movies that will aire soon are: \n${movieData}`);
            default:
                await sendMessage(chatID, `Command Unknown.`)
                break;
        }
    }else{
        await sendMessage(chatID, text);
    }
  return { statusCode: 200 };
};