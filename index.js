const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const pool = require("./configs/dbConfig");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle bus GET route for all buses
app.get("/bus/", (req, res) => {
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
app.get("/bus/:id", (req, res) => {
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
app.post("/bus/", (req, res) => {
  const { type, age, capacity, run, producer } = req.body;

  //   const query = `INSERT INTO bus ( 'type', 'age', 'capacity', 'run', 'producer' ) VALUES ( '${type}', '${age}', '${capacity}', '${run}', '${producer}' )`;
  const query = `INSERT INTO bus ( ${`type`}, ${`age`}, ${`capacity`}, ${`run`}, ${`producer`}) VALUES ( 'own', '4', '41', '30000', 'UA');`;
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
app.put("/bus/:id", (req, res) => {
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
app.delete("/bus/:id", (req, res) => {
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

// Handle in-valid route
app.all("*", function (req, res) {
  const response = { data: null, message: "Route not found!!" };
  res.status(400).send(response);
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);