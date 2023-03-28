const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");


const routerApi = require('./routes/index.js');
const middlewareErrors = require('./middlewares/error.handling');
const middlewareTimeout = require('./middlewares/general.js');
const validatorLogin = require('./middlewares/validators/validator.login');
const scheme = require('./middlewares/scheme.registration');

// const pool = require('./libs/postgres.pool');
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: (origin, callback) =>{
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(ALLOWEDORIGINS.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      let name = 'CorsError';
      const error = new Error(msg);
      error.name = 'CorsError';
      return callback(error, false);
    }
    return callback(null, true);
  }
}));


app.use(express.json());    // <==== parse request body as JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareTimeout);


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use(express.json());

// Ejemplo de middleware de validación para una ruta:
app.post('/userss', validatorLogin(scheme), (req, res) => {
  // Si la validación es exitosa, el siguiente middleware se ejecutará y se procesará la solicitud.
  // De lo contrario, se enviará una respuesta de error 400 al cliente.
  res.json({ message: 'Usuario creado correctamente' });
});

app.get('/hola', cors(), (req, res, next) => {
  console.log("Hello" );
    // res.json({ info: 'Node.js, Express, and Postgres APIss'})
    // Código que puede producir un error
    const resultado = 1/ 0; // división por cero (Error: Infinity)
    // res.send(`El resultado es ${resultado}`);
    // res.status(500).send('Este es un error 500 de prueba')

    // Pasar el error al middleware de manejo de errores
    console.log("error: " + err);
    next(err);

});

routerApi(app);
// app.get('/error', function(req, res, next) {
//   // res.status(500).send('Este es un error 500 de prueba');
//   next();
// });

app.use( middlewareErrors.handleJoiErrors);
app.use( middlewareErrors.handleCorsErrors);
app.use( middlewareErrors.middlewareErrorUrls);
app.use( middlewareErrors.errorHandler );

// app.use(middlewareErrors);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
})
