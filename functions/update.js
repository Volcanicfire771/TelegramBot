const sendMessage = require("../sendmessage");
const { scrapeMovies } = require("../features/movie_scraper/index.js");
const { filter_types } = require("../features/movie_scraper/index.js");
const { compareMovies } = require("../features/Database/db.js");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  let text = message.text;
  const chatID = message.chat.id;

  // console.log(message);
  // console.log(message.text);
  if (text.charAt(0) === "/") {
    const command = text.substr(1);

    switch (command) {
      case "start":
        await sendMessage(chatID, "Starting");
        break;
      case "current_movies":
        movieData = await scrapeMovies(1);
        str = "Movies currently airing are: \n";
        for (let i = 0; i < movieData.length; i++) {
          str += `${movieData[i]}\n`;
        }
        await sendMessage(chatID, str);
        break;
      case "soon_movies":
        movieData = await scrapeMovies(2);
        str = "Movies will aire soon are: \n";
        for (let i = 0; i < movieData.length; i++) {
          str += `${movieData[i]}\n`;
        }
        await sendMessage(chatID, str);
        break;
      // case "animenow":
      //     movieData = await scrapeMovies(13);
      //     str = "Anime Movies currently airing are: \n";
      //     for(let i = 0; i < movieData.length; i++){
      //         str += `${movieData[i]}\n`;
      //     }
      //     await sendMessage(chatID,`${movieData}`);
      // case "animesoon":
      //     movieData = await scrapeMovies(23);
      //     str = "Anime Movies that will aire soon are: \n";
      //     for(let i = 0; i < movieData.length; i++){
      //         str += `${movieData[i]}\n`;
      //     }
      //     await sendMessage(chatID,str);
      //     break;
      case "check_movies":
        // Run the comparison immediately
       msg = await compareMovies();
       await sendMessage(
        chatID,
        msg
      );
      break;
      case "help":
        str =
          "Commands are:\n-current_movies --> displays movies currently airing in Egyptain theatres.\n-soon_movies --> displays movies that will aire soon.\n-animenow --> Displays anime movies that are currently airing.\n-animesoon --> Displays anime movies that will aire in soon.";
      default:
        await sendMessage(chatID, `Command Unknown.`);
        break;
    }
  } else {
    await sendMessage(chatID, text);
  }
 
  return { statusCode: 200 };
};
