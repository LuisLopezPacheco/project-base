const express = require("express");

const userRouter = require("./routes.user");


const routerApi = (app) =>{
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', userRouter);
}

module.exports = routerApi;
