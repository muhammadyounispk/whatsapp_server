const { config } = require("dotenv");
const express = require("express");
var fs = require('fs');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const FormData = require('form-data');


const axios = require('axios');
const MainRouter = require("./app/routers");
const errorHandlerMiddleware = require("./app/middlewares/error_middleware");
const whatsapp = require("wa-multi-session");
const { getDeviceID, getBaseURL } = require("./utils/functions");
const { DisconnectDevice, connectDevice, connectingDevice } = require("./app/controllers/webhook_controller");


config();

var app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
// Public Path
app.use("/p", express.static(path.resolve("public")));
app.use("/p/*", (req, res) => res.status(404).send("Media Not Found"));
app.use('/img', express.static('img'));


app.use(MainRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || "5000";

app.set("port", PORT);

var server = http.createServer(app);
server.on("listening", (e) => console.log("APP IS RUNNING ON PORT " + PORT));

server.listen(PORT,function(err){
  //Handle any event
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
  
  
});


whatsapp.onConnected((session) => {
  connectDevice(session);
  console.log("connected => ", session);
});

whatsapp.onDisconnected((session) => {
  DisconnectDevice(session);
  console.log("disconnected => ", session);

});

whatsapp.onConnecting((session) => {
  connectingDevice(session);
  console.log("connecting => ", session);
});



whatsapp.loadSessionsFromStorage();

whatsapp.onMessageReceived(async (msg) => {
  var session = msg.sessionId;
  var url = "https://" + getBaseURL(session) + "/WhatsappWebhook/OnMessageReceived?key=IlovePakistan@786&device_id=" + getDeviceID(session);
  console.log(url);
  var data = new FormData();
  data.append('Data', JSON.stringify(msg));

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error: here', error.message);
  }

});

