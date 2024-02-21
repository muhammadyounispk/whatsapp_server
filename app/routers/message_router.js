const { Router } = require("express");
const {
  sendMessage,
  sendBulkMessage,
  sendImage,
  sendVideo,
  sendDocument,
  
} = require("../controllers/message_controller");
const MessageRouter = Router();

MessageRouter.all("/sendDocument",sendDocument );
MessageRouter.all("/sendVideo",sendVideo );
MessageRouter.all("/sendImage",sendImage );
MessageRouter.all("/sendMessage", sendMessage);
MessageRouter.all("/sendMessageBulk", sendBulkMessage);

module.exports = MessageRouter;
