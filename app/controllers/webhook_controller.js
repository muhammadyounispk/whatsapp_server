
const axios = require('axios');
const { getBaseURL, getDeviceID } = require('../../utils/functions');
exports.DisconnectDevice =  (session) => {
  var url="https://"+getBaseURL(session)+"/WhatsappWebhook/Disconnect?key=IlovePakistan@786&device_id="+getDeviceID(session);
  console.log(url);
  // Make the GET request
  axios.get(url)
  .then(response => {
    // Handle the response data
    console.log('Response data:', response.data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error.message);
  });

};
exports.connectDevice =  (session) => {
    var url="https://"+getBaseURL(session)+"/WhatsappWebhook/Connect?key=IlovePakistan@786&device_id="+getDeviceID(session);
    console.log(url);
    // Make the GET request
    axios.get(url)
    .then(response => {
      // Handle the response data
      console.log('Response data:', response.data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    });
};
exports.connectingDevice =  (device_id) => {
 console.log("Connected"+device_id);
};

