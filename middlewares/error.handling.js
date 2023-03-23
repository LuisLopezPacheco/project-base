const express = require("express");

const middlewareErrors = (app) =>{
  const router = express.Router();
  app.use('/Error', router),
  router.use('user', (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Hubo un error en la ruta');
    next();
  });
}

// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Hubo un error en la aplicación');
// });

// app.use('/ruta', function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Hubo un error en la ruta');
// });

module.exports = middlewareErrors;
