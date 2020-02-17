const express = require("express");
const bodyParser = require("body-parser");
const AccountsRouter = require("./accountsRouter");
const db = require("./data/dbConfig.js");

const server = express();

server.use(bodyParser.json());
server.use(express.json());
server.use("/api/accounts", AccountsRouter);

module.exports = server;
