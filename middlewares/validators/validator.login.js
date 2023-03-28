

const validateSchemaLogin = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("hola");

      //  return res.status(422).json({ error: error.details[0].message });
      next(error);
    }
    return next();
  };
}

module.exports = validateSchemaLogin;
