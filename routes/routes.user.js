const express = require("express");

const router = express.Router();
const services = require("../services/user.services");
const user = new services();

router.get('/', async (req, res, next) => {
  try {
    const respusta = await user.getUsers();
    res.json(respusta);
  }catch (err) {
  // res.json({ info: 'Node.js, Express, and Postgres API' })
     next(err);
    // throw new Error('Error al obtener usuarios');
  }
})

// router.get('/', async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     try{
//     const respusta = user.getUsers();
//     resolve.json(respusta);
//     }catch (reject) {
//       next(Error);
//     }
//   });
// })

module.exports = router


