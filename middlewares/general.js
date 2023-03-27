const express = require('express')
const router = express.Router()


const middlewareTime = router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
});


module.exports = middlewareTime;
