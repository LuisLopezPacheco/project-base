const express = require("express");

const router = express.Router();
const services = require("../services/user.services");
const user = new services();

router.get('/', async (req, res, next) => {
  const respusta = await user.getUsers();
  res.json(respusta);
  // res.json({ info: 'Node.js, Express, and Postgres API' })
  next();
})

module.exports = router


