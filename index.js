const express = require("express");
require('dotenv').config();

const app = express();
const routerApi = require('./routes/index.js');
const middlewareErrors = require('./middlewares/error.handling');
const bodyParser = require("body-parser");

// const pool = require('./libs/postgres.pool');
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }))

app.use('/Error', function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Hubo un error en la ruta');
  next();
});

app.use(express.json());    // <==== parse request body as JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// middlewareErrors(app);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

routerApi(app);



app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
})
