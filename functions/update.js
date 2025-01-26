const sendMessage = require("../sendmessage");
const { scrapeMovies } = require("../features/movie_scraper/index.js")

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
            case "anime":
                const movieData = await scrapeMovies();
                await sendMessage(chatID, `Anime Movies currently available in Egyptian theatres are: \n${movieData}`);
                break;
            default:
                await sendMessage(chatID, `Command Unknown.`)
                break;
        }
    }else{
        await sendMessage(chatID, text);
    }
  return { statusCode: 200 };
};