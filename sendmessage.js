const axios = require("axios").default;
module.exports = async (chat_id, text) => {
    await axios.post(`https://api.telegram.org/bot7338554015:AAFdI_REkVhWC9OGLYHeNCWqAwJbbp-O-F4/sendMessage`, {
      chat_id,
      text,
    });
  
    return true;
  };


  