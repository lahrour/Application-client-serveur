import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Bienvenue dans le Gestionnaire de Matches</h2>
      <p>
        Cette application vous permet de gérer facilement vos matches sportifs.
        Vous pouvez ajouter de nouveaux matches, consulter la liste de tous les matches,
        les modifier ou les supprimer.
      </p>
      <div className="button-container">
        <Link to="/matches" className="main-button">
          Accéder aux Matches
        </Link>
      </div>
    </div>
  );
};

export default Home;
