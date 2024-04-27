const express = require('express');
const routes = require('./routes/users.js');

const app = express();
const PORT = 5000;

// use this middleware to handle the request as a json object
app.use(express.json());

app.use("/user", routes);

app.listen(PORT, () => console.log("Server is running at port " + PORT));