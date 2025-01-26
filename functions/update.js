const sendMessage = require("../sendmessage");


exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  console.log(message);
  console.log(message.text);

    if (message == "/start" || message.text == "/start"){
        await sendMessage(message.chat.id, "Ezayak");

    }
else{
    await sendMessage(message.chat.id, "I got your message!");

}
  return { statusCode: 200 };
};