const axios = require("axios");
const baseURLSimulateData =
  "https://aj0vas3096.execute-api.us-east-2.amazonaws.com/dev/sensordata/1";

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
    sensor_id: 1,
    sensor_type: "http",
    time_stamp: Math.floor(Date.now() / 1000),
    sensor_name: "busenginepower",
    api_key: "2nd_sensor_key",
    sensor_data: Math.floor(Math.random() * 70 + 10) * 100,
  };

  simulateBusFuelData(data);
}

setInterval(simulateBusFuel, 1000);
