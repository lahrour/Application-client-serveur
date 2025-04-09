const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Matches API', function() {
  // Test unitaire pour récupérer tous les matches
  describe('GET /api/matches', function() {
    it('devrait récupérer la liste des matches', function(done) {
      request(app)
        .get('/api/matches')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  
  // Test unitaire pour ajouter un match
  describe('POST /api/matches', function() {
    it('devrait ajouter un nouveau match', function(done) {
      const match = {
        equipe1: 'PSG',
        equipe2: 'Marseille',
        score: '2-1',
        date: new Date().toISOString()
      };
      
      request(app)
        .post('/api/matches')
        .send(match)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body.equipe1).to.equal('PSG');
          expect(res.body.equipe2).to.equal('Marseille');
          expect(res.body.score).to.equal('2-1');
          done();
        });
    });
    
    it('devrait retourner une erreur 400 si des champs sont manquants', function(done) {
      const matchIncomplet = {
        equipe1: 'PSG'
        // Champs manquants
      };
      
      request(app)
        .post('/api/matches')
        .send(matchIncomplet)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});