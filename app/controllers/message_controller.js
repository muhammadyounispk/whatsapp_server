
const whatsapp = require("wa-multi-session");
const ValidationError = require("../../utils/error");
const { responseSuccessWithData } = require("../../utils/response");
var fs = require('fs');
const https = require('https');
const axios = require('axios');
const { downloadFileFromURL } = require("../../utils/functions");


exports.sendMessage = async (req, res, next) => {
  const JsonRequest = JSON.stringify(req.body);
  const Data = JSON.parse(JsonRequest);
  try {

    let to = Data.to;
    let text = Data.text;
    console.log(Data);
    const sessionId = Data.session;
    if (!to || !text) throw new ValidationError("Missing Parameters");

    const receiver = to;
    if (!sessionId) throw new ValidationError("Session Not Founds");
    const send = await whatsapp.sendTextMessage({
      sessionId,
      to: receiver,
      text,
    });

    res.status(200).json(
      responseSuccessWithData({
        id: send?.key?.id,
        status: send?.status,
        message: send?.message?.extendedTextMessage?.text || "Not Text",
        remoteJid: send?.key?.remoteJid,
      })
    );
  } catch (error) {
    next(error);
  }
};
exports.sendBulkMessage = async (req, res, next) => {
  const JsonRequest = JSON.stringify(req.body);
  const Data = JSON.parse(JsonRequest);

  try {
    const sessionId = Data.session;
    const delay = Data.delay;
    if (!sessionId) {
      return res.status(400).json({
        status: false,
        data: {
          error: "Session Not Found",
        },
      });
    }
    res.status(200).json({
      status: true,
      data: {
        message: "Bulk Message is Processing",
      },
    });
    for (const dt of Data.data) {
      const to = dt.to;
      const text = dt.text;

      await whatsapp.sendTextMessage({
        sessionId,
        to: to,
        text: text,
      });
      await whatsapp.createDelay(delay ?? 1000);
    }
    console.log("SEND BULK MESSAGE WITH DELAY SUCCESS");
  } catch (error) {
    next(error);
  }
};



exports.sendImage = async (req, res, next) => {
  const JsonRequest = JSON.stringify(req.body);
  const Data = JSON.parse(JsonRequest);

  try {
    const session = Data.session;
    const delay = Data.delay;
    if (!session) {
      return res.status(400).json({
        status: false,
        data: {
          error: "Session Not Found",
        },
      });
    }
    res.status(200).json({
      status: true,
      data: {
        message: "Bulk Media is Processing",
      },
    });
    for (const dt of Data.data) {
      const to = dt.to;
      const caption = dt.caption;
      const media = dt.media;

      const send = await whatsapp.sendImage({
        sessionId: session,
        to: to,
        text: caption,
        media: media, // can from URL too
      });
      await whatsapp.createDelay(delay ?? 1000);
    }
    console.log("SEND BULK MEDIA WITH DELAY SUCCESS");
  } catch (error) {
    next(error);
  }
};




exports.sendVideo = async (req, res, next) => {
  const JsonRequest = JSON.stringify(req.body);
  const Data = JSON.parse(JsonRequest);

  try {
    const session = Data.session;
    const delay = Data.delay;
    if (!session) {
      return res.status(400).json({
        status: false,
        data: {
          error: "Session Not Found",
        },
      });
    }
    res.status(200).json({
      status: true,
      data: {
        message: "Bulk Video is Processing",
      },
    });
    for (const dt of Data.data) {
      const to = dt.to;
      const caption = dt.caption;
      const media = dt.media;

      const send = await whatsapp.sendVideo({
        sessionId: session,
        to: to,
        text: caption,
        media: media, // can from URL too
      });
      await whatsapp.createDelay(delay ?? 1000);
    }
    console.log("SEND BULK Video WITH DELAY SUCCESS");
  } catch (error) {
    next(error);
  }
};
exports.sendDocument = async (req, res, next) => {

  const JsonRequest = JSON.stringify(req.body);
  const Data = JSON.parse(JsonRequest);

  try {
    const session = Data.session;
    const delay = Data.delay;
    if (!session) {
      return res.status(400).json({
        status: false,
        data: {
          error: "Session Not Found",
        },
      });
    }
    res.status(200).json({
      status: true,
      data: {
        message: "Bulk Document is Processing",
      },
    });
    for (const dt of Data.data) {
      const to = dt.to;
      const text = dt.text;
      const media = dt.media;
      const filename = dt.filename;
      downloadFileFromURL(media).then((fileData)=>{
        const send =  whatsapp.sendDocument({
          sessionId: session,
          to: to,
          filename: filename,
          media: fileData,
          text: text,
        });
         whatsapp.createDelay(delay ?? 1000);
         
      }).catch((e)=>{
    console.log("Error in Downloading "+e.message);
      })
      

     
     

  

      
    }
   
  } catch (error) {
    next(error);
  }
};

