const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../index');

let mongoServer;
let client;
let db;

// Fonction pour se connecter à la base de données
async function connectToTestDB() {
  try {
    // Création d'une instance MongoDB en mémoire
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    client = await MongoClient.connect(mongoUri);
    db = client.db('test');
    
    // Accéder à la collection matches
    const matchesCollection = db.collection('matches');
    
    // Rendre la collection accessible à l'application
    app.locals = app.locals || {};
    app.locals.db = db;
    app.locals.matchesCollection = matchesCollection;
    
    // Rendre les remplacements accessibles globalement pour les tests
    global.db = db;
    global.matchesCollection = matchesCollection;
    
    console.log('Connecté à la base de données de test en mémoire');
    return db;
  } catch (error) {
    console.error('Erreur de connexion à la base de données de test:', error);
    throw error;
  }
}

// Exporter une fonction pour initialiser la base de données de test
module.exports = { connectToTestDB };

// Avant tous les tests
before(async function() {
  this.timeout(10000); // Augmente le timeout pour la connexion à MongoDB
  await connectToTestDB();
});

// Après chaque test
afterEach(async function() {
  // Nettoyer la collection de matches après chaque test
  if (db) {
    await db.collection('matches').deleteMany({});
  }
});

// Après tous les tests
after(async function() {
  if (client) {
    await client.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});