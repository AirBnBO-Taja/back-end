const express = require("express");
const helmet = require("helmet");
const cors = require("cors");


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter = require("./auth/auth-router");
// const usersRouter = require("./users/users-router");
// const clientRouter = require("./clients/clients-router");

// const instructorRestricted = require("../middleware/instructor-restriced");
// const clientRestricted = require("../middleware/client-restricted");

server.use("/api/auth", authRouter);
// server.use("/api/instructor/classes", instructorRestricted, instructorsRouter);
// server.use("/api/client/classes", clientRestricted, clientRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Welcome: "to AirBnB API" });
});

module.exports = server;
