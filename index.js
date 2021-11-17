const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const pool = require("./configs/dbConfig");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle bus GET route for all buses

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/bus/", (req, res, next) => {
  const query = "SELECT * FROM bus";
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const buses = [...results];
    const response = {
      data: buses,
      message: "All buses successfully retrieved.",
    };
    res.send(response);
  });
});

// Handle bus GET route for specific bus
app.get("/bus/:id", (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM bus WHERE id=${id}`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const bus = results[0];
    const response = {
      data: bus,
      message: `Bus ${bus.id} successfully retrieved.`,
    };
    res.status(200).send(response);
  });
});

// Handle bus POST route
app.post("/bus/", (req, res, next) => {
  const { type, age, capacity, run, producer } = req.body;
  console.log(req.body);

  const query = `INSERT INTO bus ( ${`type`}, ${`age`}, ${`capacity`}, ${`run`}, ${`producer`}) VALUES ( '${type}', '${age}', '${capacity}', '${run}', '${producer}');`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const { insertId } = results;
    const bus = { id: insertId, type, age, capacity, run, producer };
    const response = {
      data: bus,
      message: `Bus ${insertId} successfully added.`,
    };
    res.status(201).send(response);
  });
});

// Handle bus PUT route
app.put("/bus/:id", (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM bus WHERE id=${id} LIMIT 1`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const { id, type, age, capacity, run, producer } = {
      ...results[0],
      ...req.body,
    };
    const query = `UPDATE bus SET type='${type}', age='${age}', capacity='${capacity}', run='${run}', producer='${producer}' WHERE id='${id}'`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const bus = {
        id,
        type,
        age,
        capacity,
        run,
        producer,
      };
      const response = {
        data: bus,
        message: `Bus ${id} is successfully updated.`,
      };
      res.send(response);
    });
  });
});

// Handler bus DELETE route
app.delete("/bus/:id", (req, res, next) => {
  const { id } = req.params;
  const query = `DELETE FROM bus WHERE id=${id}`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const response = {
      data: null,
      message: `Bus with id: ${id} successfully deleted.`,
    };
    res.send(response);
  });
});

// Handle data from sensor  GET route for specific sensor data
app.get("/sensordata/:id", (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT sensor_data FROM sensors_data WHERE sensor_id=${id}`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const bus_data = results[0];
    const response = {
      data: bus_data,
      message: `Bus  ${bus_data.id} data successfully retrieved.`,
    };
    res.status(200).send(response);
  });
});

// Handle data from sensor POST route
app.post("/sensordata/", (req, res, next) => {
  const { sensor_id, sensor_type, sensor_name, api_key, sensor_data } =
    req.body;
  console.log(req.body);
  if (sensor_id === 0 && api_key !== "1st_sensor_key") {
    const response = {
      data: null,
      message: "Api key doesn't match, device not verified",
    };
    res.send(response);
    return;
  }
  if (sensor_id === 1 && api_key !== "2nd_sensor_key") {
    const response = {
      data: null,
      message: "Api key doesn't match, device not verified",
    };
    res.send(response);
    return;
  }

  const query = `INSERT INTO sensors_data ( ${`sensor_id`}, ${`sensor_type`}, ${`sensor_name`}, ${`api_key`}, ${`sensor_data`}) VALUES ( '${sensor_id}', '${sensor_type}', '${sensor_name}', '${api_key}', '${sensor_data}');`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const { insertId } = results;
    const bus_data = {
      sensor_id: insertId,
      sensor_id,
      sensor_type,
      sensor_name,
      api_key,
      sensor_data,
    };
    const response = {
      data: bus_data,
      message: `Bus data ${insertId} successfully added.  `,
    };
    res.status(201).send(response);
  });
});

// Handle bus PUT route
app.put("/sensordata/:sensor_id", (req, res, next) => {
  const { sensor_id } = req.params;
  const query = `SELECT * FROM sensors_data WHERE sensor_id=${sensor_id} LIMIT 1`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const { sensor_id, sensor_type, sensor_name, api_key, sensor_data } = {
      ...results[0],
      ...req.body,
    };
    if (sensor_id === 0 && api_key !== "1st_sensor_key") {
      const response = {
        data: null,
        message: "Api key doesn't match, device not verified",
      };
      res.send(response);
      return;
    }
    if (sensor_id === 1 && api_key !== "2nd_sensor_key") {
      const response = {
        data: null,
        message: "Api key doesn't match, device not verified",
      };
      res.send(response);
      return;
    }
    const query = `UPDATE sensors_data SET sensor_type='${sensor_type}', sensor_name='${sensor_name}', api_key='${api_key}', sensor_data='${sensor_data}' WHERE sensor_id='${sensor_id}'`;
    pool.query(query, (err, results, fields) => {
      if (err) {
        const response = { data: null, message: err.message };
        res.send(response);
      }

      const bus_data = {
        sensor_id: insertId,
        sensor_id,
        sensor_type,
        sensor_name,
        api_key,
        sensor_data,
      };
      const response = {
        data: bus_data,
        message: `Bus data ${sensor_id} is successfully updated.`,
      };
      res.send(response);
    });
  });
});

// Handler bus DELETE route
app.delete("/sensordata/:sensor_id", (req, res, next) => {
  const { sensor_id } = req.params;
  const query = `DELETE FROM sensors_data WHERE sensor_id=${sensor_id}`;
  pool.query(query, (err, results, fields) => {
    if (err) {
      const response = { data: null, message: err.message };
      res.send(response);
    }

    const response = {
      data: null,
      message: `Bus data with id: ${sensor_id} successfully deleted.`,
    };
    res.send(response);
  });
});

// Handle in-valid route
app.all("*", function (req, res) {
  const response = { data: null, message: "Route not found!!" };
  res.status(400).send(response);
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);
