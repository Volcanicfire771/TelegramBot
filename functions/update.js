const sendMessage = require("../sendmessage");


exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
    if (message == "/start"){
        await sendMessage(message.chat.id, "Ezayak");

    }

  await sendMessage(message.chat.id, "I got your message!");
  return { statusCode: 200 };
};