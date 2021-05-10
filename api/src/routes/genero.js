const generoRouter = require('express').Router();
const { getGeneros } = require('../repositorio/genero');


generoRouter.get('/', getGeneros);

module.exports = generoRouter;