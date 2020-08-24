require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));



// const express = require('express')
// const welcomeRouter = require('./routers/welcomeRouter')
// const errorCatcher = require('./middleware/errorCatcher')

// //port & ip
// const server = express()
// const port = process.env.PORT || 5000;

// //global
// server.use(express.json())

// //routes
// server.use('/', welcomeRouter)

// //misc
// server.use(errorCatcher.errorCatcher);
// server.listen(port, () => {
//     console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
//   });