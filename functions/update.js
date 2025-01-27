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
                str = "Movies currently airing are: \n";
                for(let i = 0; i < movieData.length; i++){
                    str += `${movieData[i]}\n`;
                }
                await sendMessage(chatID,str);
            case "soon_movies":
                movieData = await scrapeMovies(2);
                str = "Movies will aire soon are: \n";
                for(let i = 0; i < movieData.length; i++){
                    str += `${movieData[i]}\n`;
                }
                await sendMessage(chatID,str);
            case "animenow":
                movieData = await scrapeMovies(13);
                str = "Anime Movies currently airing are: \n";
                for(let i = 0; i < movieData.length; i++){
                    str += `${movieData[i]}\n`;
                }
                await sendMessage(chatID,`${movieData}`);
            case "animesoon":
                movieData = await scrapeMovies(23);
                str = "Anime Movies that will aire soon are: \n";
                for(let i = 0; i < movieData.length; i++){
                    str += `${movieData[i]}\n`;
                }
                await sendMessage(chatID,str);
            default:
                await sendMessage(chatID, `Command Unknown.`)
                break;
        }
    }else{
        await sendMessage(chatID, text);
    }
  return { statusCode: 200 };
};