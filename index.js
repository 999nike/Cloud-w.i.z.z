const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const msg = req.query.msg || "Hello from Cloud Wizz!";
  res.send(`Wizz says: ${msg}`);
});

module.exports = app;
