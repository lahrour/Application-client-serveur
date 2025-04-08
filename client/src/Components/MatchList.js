import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [formData, setFormData] = useState({
    equipe1: '',
    equipe2: '',
    score: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Charger les matches au chargement du composant
  useEffect(() => {
    getMatches();
  }, []);

  // Récupérer tous les matches
  const getMatches = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/matches');
      setMatches(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des matches');
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ajouter ou mettre à jour un match
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Mise à jour d'un match existant
        await axios.put(`http://localhost:5000/api/matches/${editingId}`, formData);
      } else {
        // Ajout d'un nouveau match
        await axios.post('http://localhost:5000/api/matches', formData);
      }
      // Réinitialiser le formulaire et recharger les matches
      setFormData({
        equipe1: '',
        equipe2: '',
        score: '',
        date: new Date().toISOString().split('T')[0],
      });
      setEditingId(null);
      getMatches();
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'enregistrement du match');
    }
  };

  // Modifier un match existant
  const handleEdit = (match) => {
    setFormData({
      equipe1: match.equipe1,
      equipe2: match.equipe2,
      score: match.score,
      date: match.date.split('T')[0], // Convertir la date au format YYYY-MM-DD
    });
    setEditingId(match.id);
  };

  // Supprimer un match
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce match ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/matches/${id}`);
        getMatches();
      } catch (err) {
        setError('Erreur lors de la suppression du match');
      }
    }
  };

  return (
    <div className="matches-container">
      <div className="top-bar">
        <h2>Gestion des Matches</h2>
        <Link to="/" className="back-btn">
          Retour à l'accueil
        </Link>
      </div>

      {loading && <p>Chargement en cours...</p>}
      {error && <p className="error">{error}</p>}

      <div className="form-container">
        <h3>{editingId ? 'Modifier le Match' : 'Ajouter un Match'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Équipe 1</label>
            <input
              type="text"
              name="equipe1"
              value={formData.equipe1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Équipe 2</label>
            <input
              type="text"
              name="equipe2"
              value={formData.equipe2}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Score</label>
            <input
              type="text"
              name="score"
              value={formData.score}
              onChange={handleChange}
              placeholder="Ex: 2-1"
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setFormData({
                    equipe1: '',
                    equipe2: '',
                    score: '',
                    date: new Date().toISOString().split('T')[0],
                  });
                  setEditingId(null);
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="matches-list">
        <h3>Liste des Matches</h3>
        {matches.length === 0 ? (
          <p>Aucun match enregistré</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Équipe 1</th>
                <th>Équipe 2</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id}>
                  <td>{match.equipe1}</td>
                  <td>{match.equipe2}</td>
                  <td>{match.score}</td>
                  <td>{new Date(match.date).toLocaleDateString()}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(match)}>
                      Modifier
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(match.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MatchesList;