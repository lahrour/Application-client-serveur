import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import MatchesList from './Components/MatchList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Gestionnaire de Matches</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<MatchesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;