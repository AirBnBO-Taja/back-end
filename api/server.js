const express = require("express");
const authRouter = require("../auth/auth-router");
const propertiesRouter = require("../properties/properties-router");
const listingsRouter = require("../listings/listings-router")
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const restricted = require("../auth/restricted-middleware");

server.get("/", (req, res) => {
  res.status(200).json({ Welcome: "to AirBnB Server" });
});

server.use("/api/auth", authRouter);
server.use("/api/properties", restricted, propertiesRouter);
server.use('/api/listings', restricted, listingsRouter)



module.exports = server;
