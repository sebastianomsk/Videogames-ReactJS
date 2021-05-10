const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue('platforms'));
      },
      set: function (val) {
        Date
        return this.setDataValue('platforms', JSON.stringify(val));
      }
    },
    background_image: {
      type: DataTypes.TEXT
    }


  },
    {
      hooks: {
        beforeCreate: (videogame) => {
          console.log('Videogame nombre: ', videogame.getDataValue('name'))//borrar
          lanzarError(videogame, 'id');
          lanzarError(videogame, 'name');
          lanzarError(videogame, 'description');
          lanzarError(videogame, 'platforms');
        }
      }
    }
  );
};


function lanzarError(videogame, campo) {
  if (!videogame.getDataValue(campo)) {
    throw new Error(`"El campo ${campo} es obligatorio. ${videogame.getDataValue('name')}"`);
  }
}
