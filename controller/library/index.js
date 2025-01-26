const { handleMessage } = require("C:\\Users\\margh\\Desktop\\Telegram_Bot\\controller\\library\\telegram.js");

async function handler(req, method){
    const { body } = req;
    if (body) {
        const messageObj = body.message;
        await handleMessage(messageObj);
        
    }
    return;
}

module.exports = { handler };