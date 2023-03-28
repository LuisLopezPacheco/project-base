const express = require("express");

// middleware para manejar errores de CORS
const handleCorsErrors = (err, req, res, next) => {
  // console.log(err.name);
  console.log(err);
  if (err.name === 'CorsError') { // si el error es de CORS
    res.status(403).json({
      error: 'No se permite el acceso desde este origen.'
    });
  } else {
    next(err); // si no es un error de CORS, pasa al siguiente middleware de manejo de errores
  }
}

const handleJoiErrors = (err, req, res, next) => {

  if (err.name === 'ValidationError'){
    res.status(422).send(`422: Unprocessable Content. ${err.message}`);
  }
}

const errorHandler = (err, req, res, next) => {
  if (err.status === 400) {
    console.error(err.stack);
    // Manejar el error 400 (Solicitud incorrecta)
    res.status(400).send(`Solicitud incorrecta ${err.status}`);
  } else if (err.status === 401) {
    console.error(err.stack);
    // Manejar el error 401 (No autorizado)
    res.status(401).send(`No autorizado: ${err.status}`);
  } else if (err.status === 403) {
    console.error(err.stack);
    // Manejar el error 403 (Prohibido)
    res.status(403).send(`Prohibido: ${err.status}`);
  } else if (err.status === 404) {
    // Manejar el error 404 (No encontrado)
    // console.error(err.stack);
    res.status(404).send(`No encontrado: ${err.status}`);
  } else {
    console.log()
    // console.log(err.stack);
    // console.log(res.name);
    // console.log(err.code);

    // Manejar cualquier otro error
    // console.error(err.stack);
    res.status(500).send(`Error interno del servidor: 500`);
  }
};



// app.get('/', function(req, res, next) {
//   try {
//     // Código que puede producir un error
//     const resultado = 1 / 0; // división por cero (Error: Infinity)
//     res.send(`El resultado es ${resultado}`);
//   } catch (error) {
//     // Pasar el error al middleware de manejo de errores
//     next(error);
//   }
// });
// const middlewareErrorUrls = ("*", (req, res, next) => {
//   const err = Error(`Requested path ${req.path} not found`);
//   res.status(404).send('No encontrado: ');
//   // res.status(404).send({
//   // success: false,
//   // message: "Requested path ${req.path} not found",
//   // stack: err.stack,
//   // });
//   next(err);
//   });

const middlewareErrorUrls = ((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

module.exports = {
  errorHandler,
  middlewareErrorUrls,
  handleCorsErrors,
  handleJoiErrors
};
