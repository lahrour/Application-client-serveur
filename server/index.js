require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000;

// Configuration CORS plus précise
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Configuration de la connexion MongoDB
const MONGO_URI = "mongodb+srv://matches:8AJ60qlq9Horkb4T@cluster0.2qazv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = 'football_db';
const COLLECTION_NAME = 'matches';


// Connexion à MongoDB
let db;
let matchesCollection;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    db = client.db(DB_NAME);
    matchesCollection = db.collection(COLLECTION_NAME);
    console.log('Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
}

// Ajouter un match
app.post('/api/matches', async (req, res) => {
  try {
    const { equipe1, equipe2, score, date } = req.body;
    
    if (!equipe1 || !equipe2 || !score || !date) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    
    const result = await matchesCollection.insertOne({
      equipe1,
      equipe2,
      score,
      date
    });
    
    res.status(201).json({
      id: result.insertedId,
      equipe1,
      equipe2,
      score,
      date
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du match', details: error.message });
  }
});

// Récupérer tous les matches
app.get('/api/matches', async (req, res) => {
  try {
    const matches = await matchesCollection.find().sort({ date: -1 }).toArray();
    
    // Transformer _id en id pour conserver la compatibilité
    const formattedMatches = matches.map(match => ({
      id: match._id,
      equipe1: match.equipe1,
      equipe2: match.equipe2,
      score: match.score,
      date: match.date
    }));
    
    res.json(formattedMatches);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des matches', details: error.message });
  }
});

// Récupérer un match spécifique
app.get('/api/matches/:id', async (req, res) => {
  try {
    const matchId = req.params.id;
    
    if (!ObjectId.isValid(matchId)) {
      return res.status(400).json({ error: 'ID de match invalide' });
    }
    
    const match = await matchesCollection.findOne({ _id: new ObjectId(matchId) });
    
    if (!match) {
      return res.status(404).json({ error: 'Match non trouvé' });
    }
    
    res.json({
      id: match._id,
      equipe1: match.equipe1,
      equipe2: match.equipe2,
      score: match.score,
      date: match.date
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du match', details: error.message });
  }
});

// Mettre à jour un match
app.put('/api/matches/:id', async (req, res) => {
  try {
    const matchId = req.params.id;
    const { equipe1, equipe2, score, date } = req.body;
    
    if (!ObjectId.isValid(matchId)) {
      return res.status(400).json({ error: 'ID de match invalide' });
    }
    
    if (!equipe1 || !equipe2 || !score || !date) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    
    const result = await matchesCollection.updateOne(
      { _id: new ObjectId(matchId) },
      { $set: { equipe1, equipe2, score, date } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Match non trouvé' });
    }
    
    res.json({
      id: matchId,
      equipe1,
      equipe2,
      score,
      date
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du match', details: error.message });
  }
});

// Supprimer un match
app.delete('/api/matches/:id', async (req, res) => {
  try {
    const matchId = req.params.id;
    
    if (!ObjectId.isValid(matchId)) {
      return res.status(400).json({ error: 'ID de match invalide' });
    }
    
    const result = await matchesCollection.deleteOne({ _id: new ObjectId(matchId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Match non trouvé' });
    }
    
    res.json({ message: 'Match supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du match', details: error.message });
  }
});

// Démarrer le serveur après la connexion à la base de données
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Impossible de démarrer le serveur:', error);
  });
