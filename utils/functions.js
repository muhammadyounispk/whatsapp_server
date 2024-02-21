
const axios = require('axios');
 async function downloadFileFromURL(url) {
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
  
      // Assuming the response contains the file data in a binary format.
      // Modify the "responseType" and parsing according to the type of file you expect.
  
      return response.data;
    } catch (error) {
      console.error('Error reading file from URL:', error.message);
      throw error;
    }
  }
 

   function getDeviceID(device_name="21_apis.isdigitalschools.com") {
    var part=device_name.split("_");
    return part[0];
  }
   function getBaseURL(device_name="21_apis.isdigitalschools.com") {
    var part=device_name.split("_");
    return part[1];
  }
  
  module.exports = {
    downloadFileFromURL,
    getDeviceID,
    getBaseURL
  };