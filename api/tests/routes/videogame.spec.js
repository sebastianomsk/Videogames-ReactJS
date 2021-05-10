/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genero, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const agent = session(app);
// const videogame = {
//   name: 'Super Mario Bros',
// };
let fechaBase = new Date(2020, 12, 31);//año mes día 

const id1=uuidv4();
const id2=uuidv4();
const id3=uuidv4();
const id4=uuidv4();


const videojuego1 = {
  id:id1, 
  name: 'juego1',
  description: 'cuidado con el vicio',
  released: new Date().toISOString(),
  rating: 3.2,
  platforms: ["Xbox", 'PC'],
  background_image: '//ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg'
}

const videojuego2 = {
  id: id2,
  name: 'juego2',
  description: 'cuidado con el vicio',
  released: fechaBase.setDate(fechaBase.getDate() + 1),
  rating: 3.5,
  platforms: ["PlayStation 5", "Xbox"],
  background_image: '//ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg'
}

const videojuego3 ={
  id: id3,
  name: 'juego3',
  description: 'cuidado con el vicio',
  released: fechaBase.setDate(fechaBase.getDate() + 1),
  rating: 3.4,
  platforms: ["PlayStation 5", "Xbox"],
  background_image: '//ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg'
}
const videojuego4 ={
  id: id4,
  name: 'raro1',
  description: 'cuidado con el vicio',
  released: fechaBase.setDate(fechaBase.getDate() + 1),
  rating: 3.4,
  platforms: ["PlayStation 5", "Xbox"],
  background_image: '//ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg'
}
const genero1 = {
  id: 14111992,
  name: 'Aventura'
}
const genero2 = {
  id: 14111991,
  name: "Drama"
}


describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true })
    .then( () => conn.sync({ force : true }))
 
    .then(()=> Videogame.create(videojuego1))
  
    
    .catch((e)=>console.log("Err: ",e))
    );


  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
      .then(res=>console.log("test 1: un solo video game ",res.body))
    );

    it('responde con un json con todas los videojuegos. Total 2.', function () {
      console.log("test 2")
      return Videogame.create(videojuego3)
        .then(() => {
          return agent.get('/videogames')
        })
        .then(res => {
          expect(res.body.videogames.length).to.equal(2)
        })
    });

    it('/videogames?name=1 responde con juego1', function() {
      console.log("test 3")

      return Videogame.create(videojuego3)

      .then(() => {
        return agent.get('/videogames?name=1 ')
      })
      .then(res => {
        expect(res.body.videogames.length).to.equal(1)
        expect(res.body.videogames[0].name).to.equal('juego1')
        expect(res.body.videogames[0].id).to.equal(id1)
      })
    });


    it('/videogames?rating=true&orden=desc responde con juego2, juego3, juego1', function() {
      console.log("test 4")

      return Videogame.create(videojuego2)
      .then(() => {
      return Videogame.create(videojuego3)
      })
      .then(() => {
        return agent.get('/videogames?rating=true&orden=desc ')
      })
      .then(res => {
        expect(res.body.videogames.length).to.equal(3)
        expect(res.body.videogames[0].name).to.equal('juego2')
        expect(res.body.videogames[0].id).to.equal(id2)
        expect(res.body.videogames[1].name).to.equal('juego3')
        expect(res.body.videogames[1].id).to.equal(id3)
        expect(res.body.videogames[2].name).to.equal('juego1')
        expect(res.body.videogames[2].id).to.equal(id1)
      })
    });
    it('/videogames?rating=true&orden=asc responde con juego1, juego3, juego2', function() {
      console.log("test 5")

      return Videogame.create(videojuego2)
      .then(() => {
      return Videogame.create(videojuego3)
      })
      .then(() => {
        return agent.get('/videogames?rating=true&orden=asc ')
      })
      .then(res => {
        expect(res.body.videogames.length).to.equal(3)
        expect(res.body.videogames[0].name).to.equal('juego1')
        expect(res.body.videogames[0].id).to.equal(id1)
        expect(res.body.videogames[1].name).to.equal('juego3')
        expect(res.body.videogames[1].id).to.equal(id3)
        expect(res.body.videogames[2].name).to.equal('juego2')
        expect(res.body.videogames[2].id).to.equal(id2)
      })
    });
    
    it('/videogames?rating=true&orden=asc&name=juego responde con juego1, juego3, juego2',  function() {
      console.log("test 6************")
      return Videogame.create(videojuego2)
      .then(() => {
      return Videogame.create(videojuego3)
      })
      .then(() => {
        return agent.get('/videogames?rating=true&orden=asc&name=juego ')
      })
      .then(res => {
        expect(res.body.videogames.length).to.equal(3)
        expect(res.body.videogames[0].name).to.equal('juego1')
        expect(res.body.videogames[0].id).to.equal(id1)
        expect(res.body.videogames[1].name).to.equal('juego3')
        expect(res.body.videogames[1].id).to.equal(id3)
        expect(res.body.videogames[2].name).to.equal('juego2')
        expect(res.body.videogames[2].id).to.equal(id2)
      })
    });
    
    it('/videogame/id2 responde con juego2',  function() {
      console.log("test 7************")
      return Videogame.create(videojuego2)
      .then(() => {
      return Videogame.create(videojuego3)
      })
      .then(() => {
        console.log("pidiendo get")
        return agent.get('/videogame/'+id2)
      })
      .then(res => {
        expect(res.body.name).to.equal('juego2')
      })
    });
    

    

  });
});

