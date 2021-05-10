const videogameRouter = require('express').Router();
const videogamesRouter = require('express').Router();
const { searchVideogames, createVideogame, findVideogameById, getPlataformas } = require('../repositorio/videogame');



// Obtener un listado de los primeras 15 videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
videogameRouter.post('/',  createVideogame );
videogameRouter.get('/:id',  findVideogameById );

videogamesRouter.get('/',  searchVideogames );
videogamesRouter.get('/plataformas',  getPlataformas );

// module.exports = videogamesRouter;
module.exports = {
    videogameRouter,
    videogamesRouter
}
