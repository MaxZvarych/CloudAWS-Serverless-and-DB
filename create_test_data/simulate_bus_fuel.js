const axios = require("axios");
const baseURLSimulateData =
  "http://a9b41ad67318c4b8c8e356dc2ef6a97a-1329213901.us-east-2.elb.amazonaws.com:3300/dev/sensordata/0";

const simulateBusFuelData = async (body) => {
  try {
    let responseData = await axios.put(baseURLSimulateData, body);

    return responseData.data;
  } catch {
    console.log("Simulated data:", body);
  }
};

async function simulateBusFuel() {
  const data = {
    sensor_id: 0,
    sensor_type: "http",
    time_stamp: Math.floor(Date.now() / 1000),
    sensor_name: "busfuel",
    api_key: "1st_sensor_key",
    sensor_data: Math.floor(Math.random() * 200),
  };

  simulateBusFuelData(data);
}

setInterval(simulateBusFuel, 10000);
