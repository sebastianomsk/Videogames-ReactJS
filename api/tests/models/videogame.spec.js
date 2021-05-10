const { Videogame,Genero, conn } = require('../../src/db.js');
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);
const { v4: uuidv4 } = require('uuid');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => 
      Videogame.sync({ force: true })
  
    );
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should throw an error when fiel name is sended only', () => {
        Videogame.create({ name: 'Super Mario Bros' })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should not work when its a void id', () => {
        Videogame.create(
          {
            name: 'Juego medio',
            description: 'Es un juego bueno',
            rating: 3.1,
            platforms: ['Xbox'],
          })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its everythin is ok', () => {
        const id = uuidv4()
        return Videogame.create(
          { 
            id,
            name: 'Juego medio',
            description: 'Es un juego bueno',
            platforms: ['Xbox'],
            rating: 3.1,
          })
          .then(() => {
            return agent.get('/videogame/'+id)
          })
          .then( res=>{
            expect(res.body.id).to.equal(id);
          })
      });

    });
  });
});
