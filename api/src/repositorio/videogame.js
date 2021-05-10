const { Genero, Videogame } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const { findGenerosById } = require('./genero');
const { v4: uuidv4 } = require('uuid');
const { Op, Sequelize } = require('sequelize');
// Únicos Endpoints/Flags que pueden utilizar

//     GET https://api.rawg.io/api/games
//     GET https://api.rawg.io/api/games?search={game}
//     GET https://api.rawg.io/api/genres
//     GET https://api.rawg.io/api/games/{id}

// GET /videogames: 
// GET /videogames?name="...": 

// http://localhost:3001/videogames
async function searchVideogames(req, res, next) {
    const { name, genero } = req.query;
    const rating = req.query.rating || false;
    let { orden } = req.query || null;
    let offset = Number(req.query.offset)||0;//0;//por ahora
    let limit = 15;//por ahora

    let consulta = {
        offset,
        limit,
        attributes: ['id', 'name', 'background_image','rating']
    }

    try {
        //filtro por nombre sin orden
        if (name) {
            consulta.where = {
                name: {
                  [Op.iLike]: `%${name}%`
                }
            }
        }
 
        //filtro por genero sin orden
        if (genero) {
           consulta.include= {
                model: Genero,
                attributes: ['id', 'name'],
                where: {
                    name: {
                        [Op.iLike]: `%${genero}%`
                    }
                }
            }
        }

        //Ordeno por rating
        //son muy parecidos estos dos
        if (rating) {
            validarOrden();
            consulta.order = [['rating', orden]];
    //      consulta.order = [['released', orden]];
        }


        //Ordeno por nombre
        if( (name||name==='') && orden && !rating){
            validarOrden();
            consulta.order = [['name', orden]];
        }

        //cuento la cantidad de videojuego que coinciden con la busqueda (sin tener en cuenta las coincidencias de los generos)
        const { count:cantidad, rows:nada } = await Videogame.findAndCountAll(consulta);

        // si no pregunto por genero, entonces envio el videojuego con todos sus generos
        if (!genero) {
            consulta.include= {
                model: Genero,
                attributes: ['id', 'name']
            }
        }

        const { count, rows } = await Videogame.findAndCountAll(consulta);

        return res.send(
            {
                cantidad: cantidad,
                pagina: getPaginaActual(),
                videogames: rows,
                selfEndpoint: actualEndPoint(offset)
            }
        );
    } catch (error) {
        next(error);
    }



    function validarOrden() {
        if (orden.toLocaleLowerCase() !== 'desc' && orden.toLocaleLowerCase() !== 'asc') {
            return res.status(400).send({ message: 'No se reconoce el valor de la query orden, debe ser: asc o desc' })
        }
    }


    function getPaginaActual() {
        return (offset + limit) / limit;
    }

    function actualEndPoint(offset) {
        let endpoint = `http://localhost:3001/videogames?offset=${offset}`;

        if (name) endpoint += `&name=${name}`;
        if (rating) endpoint += `&rating=${rating}`;
        if (genero) endpoint += `&genero=${genero}`;
        if (orden) endpoint += `&orden=${orden}`;
        return endpoint;
    }
}




/**
 * 
 * Bucar videogames por Id
 */
async function findVideogameById(req, res, next) {
    const { id }=req.params;
    try {
        const game = await Videogame.findByPk(id, { include: { model: Genero } });
        if (!game) return res.sendStatus(404);

        return res.status(200).json(game);
    } catch (error) {
        next(error);
    }
}



function getVideogameAPIExterna(page) {
    if (page === 1) {
        // console.log("pedido de la pagina 1")
        return axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    }

    if (page >= 2 && page <= 5) {
        // console.log("pidendo a la pagina: ", page);
        return axios.get(`https://api.rawg.io/api/games?page=${page}&key=${API_KEY}`);
    }
}

/**
 * Traigo solamente 100 Id de video juegos
 */
async function getOneHundredIdsOfVideogames() {
    try {
        let videojuegos = [];
        const arrayDePromesas = [];

        for (let i = 1; i <= 5; i++) {
            arrayDePromesas.push(getVideogameAPIExterna(i));
        }

        videojuegos = await Promise.all(arrayDePromesas);
        videojuegos = videojuegos.map(promesa => {
            return promesa.data.results.map(videogame => videogame.id);
        }).flat();

        return videojuegos;

    } catch (error) {
        console.error('Hubo un error: ' + error)
    }
}



/**
 * 
 Metodo para crear videojuegos
 */
async function createVideogame(req, res, _next) {
    //se usa en post
    const { name, description, released, platforms, idGeneros, background_image } = req.body;
    let rating = Number(req.body.rating);
    // released tiene que venir en formato new Date().toISOString(),

    // Nombre
    // Descripción
    // Fecha de lanzamiento
    // Rating
    // Posibilidad de seleccionar/agregar varias plataformas

    // este lo tengo que relacionar con la tabla intermedia
    // Posibilidad de seleccionar/agregar varios géneros

    if (!name && !description && !released && !rating && !platforms.length && !generos.length) {
        return res.status(400).send({ message: "Faltan datos para crear un videojuego" });
    }

    try {
        //creamos el videojuego
        //Los campos no son obligatorios
        const videojuego = await Videogame.create({
            id: uuidv4(),
            name,
            description,
            released,//: new Date().toISOString(),
            rating,
            platforms,
            background_image
        })
        // buscamos el/los genero(s)
        const generosDB = await findGenerosById(idGeneros);

        //le agrego su relación
        videojuego.setGeneros(generosDB);
        console.log("listo, videojuego creado!")
        return res.status(201).send({ message: 'Nuevo videojuego agregado', videojuego })
    } catch (error) {
        return res.status(500).send({ message: "No se pudo agregar el videjuego", error })
    }


}


/**
 * Traigo un array de videojuegos con sus detalles
 * Params(arrayId): es un array con varios id de juegos a buscar
 */
async function getVideogames(arrayId) {
    //usado en bootstrap
    try {
        const arrayDePromesas = [];
        for (let i = 0; i < arrayId.length; i++) {
            arrayDePromesas.push(axios.get(`https://api.rawg.io/api/games/${arrayId[i]}?key=${API_KEY}`));
        }
        videojuegos = await Promise.all(arrayDePromesas);

        videojuegos = videojuegos.map(promesa => {
            return {            
                    name:             promesa.data.name,
                    released:         promesa.data.released,
                    rating:           promesa.data.rating,
                    platforms:        promesa.data.platforms.map(plataforma => plataforma.platform.name),//solamente name
                    background_image: promesa.data.background_image,
                    generos:          promesa.data.genres.map(genero => genero.id),
                    description:      promesa.data.description_raw
                }
            
        }).flat();

        return videojuegos;
        
    } catch (error) {
        console.log("Error getVideogames: ", error)
    }
}


//experimental
async function getPlataformas(_req, res, _next) {
    try {
        const { count, rows } = await Videogame.findAndCountAll({attributes: ['platforms']});//[[a,b],[c,b],[a,d]]
        const plataformasDisponibles = [...new Set(rows.map(e=>e.platforms).flat() )];

        return res.status(201).send(plataformasDisponibles);
    } catch (error) {
        return res.status(500).send({ message: "Error del servidor", error })
    }
}

async function cargarBDVideogames() {
    try {
        const { count } = await Videogame.findAndCountAll();
        console.log("cantidad de videogames: ", count)
        return count === 0;
    } catch (error) {
        console.log("Error*: ", error)
    }
}
module.exports = {
    searchVideogames,
    createVideogame,
    getVideogames,
    getOneHundredIdsOfVideogames,
    findVideogameById,
    getPlataformas,
    cargarBDVideogames
}