const { axiosInstance } = require("C:\\Users\\margh\\Desktop\\Telegram_Bot\\controller\\library\\axios.js");
const { scrapeMovies } = require("../../features/movie_scraper/index.js")




function sendMessage(messageObj, messageText){
    return axiosInstance.get("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

async function handleMessage(messageObj){
    const messageText = messageObj.text || "lol";

    if(messageText.charAt(0) === "/"){
        const command = messageText.substr(1);

        switch (command) {
            case "start":
                return sendMessage(
                    messageObj,
                    "Helli"
                );
            
            case "anime":
                const movieData = await scrapeMovies();
                // const movies = movieData.join("\n");
                // console.log("received data: ", movieData);
                return sendMessage(
                    messageObj,
                    `Anime Movies currently available in Egyptian theatres are: \n${movieData} `
                );

            default:
                return sendMessage(messageObj,"Wuh?");
        }
   
    }else{
        return sendMessage(messageObj, messageText);
    }
}



module.exports = { handleMessage };