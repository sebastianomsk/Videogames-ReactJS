const { Genero, Videogame } = require('../db');
const axios = require('axios');
const { cargarBaseDeDatos, findGenerosById } = require('../repositorio/genero');
const { getVideogames, getOneHundredIdsOfVideogames, cargarBDVideogames } = require('../repositorio/videogame');
const { v4: uuidv4 } = require('uuid');
const { API_KEY } = process.env;

async function cargarBD() {
    if (await cargarBaseDeDatos()) {
        try {
            console.log("Pedido a la Api")
            const generos = await getGeneros();//[{},{}]

            console.log("cargando la BD");
            const generoBD = [];

            generos.results.forEach(genero => {
                generoBD.push(Genero.create({
                    id: genero.id,
                    name: genero.name
                }))
            });

            await Promise.all(generoBD);

            console.log("BD cargada exitosamente");
        } catch (error) {
            console.log("Error carga generos: ", error);
        }
    } else {
        console.log("BD ya estaba cargada");
    }

    if(await cargarBDVideogames()){
        try {
            await crearVideoJuegos();
            console.log("BD cargada exitosamente");
        } catch (error) {
            console.log("Error carga videogame: ", error);
        }
    }

}

async function getGeneros() {
    try {
        let res = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        return res.data;
    } catch (error) {
        console.error('Hubo un error: ' + error)
    }
}


async function crearVideoJuegos() {
    //creamos videojuegos
    //Los campos son obligatorios
    console.time("mostrar");
    try {
        let fechaBase = new Date(2020, 12, 31);//año mes día 

        const videojuego1 = await Videogame.create({
            id: uuidv4(),
            name: 'juego1',
            description: 'cuidado con el vicio',
            released: new Date().toISOString(),
            rating: getRandomInt(1, 6),
            platforms: ["Xbox", 'PC'],
            background_image: 'https://i.pinimg.com/originals/e2/f2/11/e2f211f6cb86a2f54491ed33f065d9ca.png'
        })
        const videojuego2 = await Videogame.create({
            id: uuidv4(),
            name: 'juego2',
            description: 'cuidado con el vicio',
            released: fechaBase.setDate(fechaBase.getDate() + 1),
            rating: getRandomInt(1, 6),
            platforms: ["PlayStation 5", "Xbox"],
            background_image: 'https://i.pinimg.com/originals/e2/f2/11/e2f211f6cb86a2f54491ed33f065d9ca.png'
        })


        //traigo los cien ids
        const cienIds = await getOneHundredIdsOfVideogames();
        console.log("cien ids: ", cienIds);

        //busco cada videojuego
        const videogames = await getVideogames(cienIds)

        videogames.forEach(async juego => {
            const game = await Videogame.create(
                {
                    id: uuidv4(),//modificar uuid
                    name: juego.name,
                    released: juego.released,
                    rating: juego.rating,
                    platforms: juego.platforms,
                    background_image: juego.background_image,
                    description: juego.description,
                }
            );

            const generos = await findGenerosById(juego.generos);

            game.setGeneros(generos);
        })

        let accion = await Genero.findByPk(4);
        let indie = await Genero.findByPk(51);
        let adventure = await Genero.findByPk(3);

        //le agrego su relación
        videojuego1.setGeneros(accion);
        videojuego2.setGeneros([indie, adventure]);

        await Promise.all([videojuego1, videojuego2]);

    } catch (error) {
        console.log("ERROR Bootstrap*: ", error)
    }
    console.timeEnd("mostrar");

}

//utilidades
/**
 * Genera un numero aleatorio de un digito entre un rango de valores
 * @param {minimo numero incluido} min 
 * @param {maximo numero excluido} max 
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = cargarBD;