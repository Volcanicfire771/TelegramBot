const sendMessage = require("../sendmessage");
const handler = require("../controller/library/index");
const handleMessage = require("../controller/library/telegram");

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  await sendMessage(message.chat.id, handleMessage(event.body));
  return { statusCode: 200 };
};