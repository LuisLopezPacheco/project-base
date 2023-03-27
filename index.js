const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const Joi = require('joi');

const routerApi = require('./routes/index.js');
const middlewareErrors = require('./middlewares/error.handling');
const middlewareTimeout = require('./middlewares/general.js');
const middlewareJoi = require('./schemajoi/schema.js')

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


const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  access_token: [Joi.string(), Joi.number()],
  birth_year: Joi.number().integer().min(1900).max(2013),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).with('username', 'birth_year');

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("hola");
      return res.status(400).json({ error: error.details[0].message });
    }
    return next();
  };
}

app.use(express.json());

// Ejemplo de middleware de validación para una ruta:
app.post('/userss', validateSchema(schema), (req, res) => {
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

app.use( middlewareErrors.handleCorsErrors);
app.use( middlewareErrors.middlewareErrorUrls);
app.use( middlewareErrors.errorHandler );

// app.use(middlewareErrors);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}.`);
})
