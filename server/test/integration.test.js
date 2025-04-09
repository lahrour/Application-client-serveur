const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');

describe('Tests d\'intégration des matches', function() {
  // Test d'intégration: ajouter un match puis le récupérer
  it('devrait créer un match puis le récupérer par son ID', async function() {
    const match = {
      equipe1: 'Lyon',
      equipe2: 'Lille',
      score: '3-3',
      date: new Date().toISOString()
    };
    
    // Étape 1: Créer un match
    const postResponse = await request(app)
      .post('/api/matches')
      .send(match)
      .expect(201);
    
    const matchId = postResponse.body.id;
    
    // Étape 2: Récupérer le match par son ID
    const getResponse = await request(app)
      .get(`/api/matches/${matchId}`)
      .expect(200);
    
    expect(getResponse.body).to.be.an('object');
    expect(getResponse.body.equipe1).to.equal('Lyon');
    expect(getResponse.body.equipe2).to.equal('Lille');
    expect(getResponse.body.score).to.equal('3-3');
  });
  
  // Test d'intégration: ajouter, modifier puis supprimer un match
  it('devrait créer, modifier puis supprimer un match', async function() {
    const match = {
      equipe1: 'Nantes',
      equipe2: 'Nice',
      score: '1-0',
      date: new Date().toISOString()
    };
    
    // Étape 1: Créer un match
    const postResponse = await request(app)
      .post('/api/matches')
      .send(match)
      .expect(201);
    
    const matchId = postResponse.body.id;
    
    // Étape 2: Modifier le match
    const matchModifie = {
      equipe1: 'Nantes',
      equipe2: 'Nice',
      score: '2-0', // Score modifié
      date: new Date().toISOString()
    };
    
    const putResponse = await request(app)
      .put(`/api/matches/${matchId}`)
      .send(matchModifie)
      .expect(200);
    
    expect(putResponse.body.score).to.equal('2-0');
    
    // Étape 3: Supprimer le match
    await request(app)
      .delete(`/api/matches/${matchId}`)
      .expect(200);
    
    // Étape 4: Vérifier que le match a bien été supprimé
    await request(app)
      .get(`/api/matches/${matchId}`)
      .expect(404);
  });
});