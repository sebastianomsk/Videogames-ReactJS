const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  { videogameRouter, videogamesRouter}  = require('./videogame');
// const  videogamesRouter  = require('./videogame');
const  generoRouter  = require('./genero');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);
router.use('/genres', generoRouter);

module.exports = router;

// Backend

// Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

// IMPORTANTE: No está permitido utilizar los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades tienen que implementarlas ustedes.

//     GET /videogames:
//         Obtener un listado de los primeras 15 videojuegos
//         Debe devolver solo los datos necesarios para la ruta principal
//     GET /videogames?name="...":
//         Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//         Si no existe ningún videojuego mostrar un mensaje adecuado
//     GET /videogame/{idVideogame}:
//         Obtener el detalle de un videojuego en particular
//         Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//         Incluir los géneros asociados
//     GET /genres:
//         Obtener todos los tipos de géneros de videojuegos posibles
//         En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
//     POST /videogame:
//         Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//         Crea un videojuego en la base de datos
