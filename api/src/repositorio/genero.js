const { Genero, Videogame } = require('../db');
const { Op, Sequelize } = require('sequelize');

async function cargarBaseDeDatos() {
    try {
        const { count } = await Genero.findAndCountAll();
        console.log("cantidad de generos: ", count)
        return count === 0;
    } catch (error) {
        console.log("Error*: ", error)
    }
}

async function getGeneros(_req, res, next) {
    try {
        const { count, rows } = await Genero.findAndCountAll({attributes: ['id', 'name']});
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).send({ error })
    }
}

async function findGenerosById(idGeneros) {
    try {
        return await Genero.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: idGeneros,
                },
            },
        });
        
    } catch (error) {
        console.log("err findGenerosById: ", error)
    }
}

module.exports = {
    cargarBaseDeDatos,
    getGeneros,
    findGenerosById
}