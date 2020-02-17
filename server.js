const express = require("express");
const AccountsRouter = require("./accountsRouter");
const db = require("./data/dbConfig.js");

const server = express();

server.use("/api/accounts", AccountsRouter);

server.use(express.json());

module.exports = server;
