# Application de Gestion de Matches de Football
Cette application fullstack permet de gérer des matches de football avec une interface React en frontend et une API Express.js en backend, reliée à une base de données MongoDB.
 
## Fonctionnalités
•	Afficher la liste des matches

•	Ajouter un nouveau match

•	Modifier un match existant

•	Supprimer un match

## Technologies Utilisées
### Backend:
•	Node.js

•	Express.js

•	MongoDB

•	Tests avec Mocha, Chai et SuperTest

### Frontend:
•	React.js

•	React Router pour la navigation

•	Axios pour les requêtes HTTP

•	CSS pour le style

### DevOps:
•	Docker et Docker Compose pour la conteneurisation

•	GitHub Actions pour CI/CD


# Structure du Projet

Application-client-server/

├── server/              # API Express.js

│   ├── tests/            # Tests unitaires et d'intégration

│   ├── Dockerfile        # Configuration Docker pour le backend

│   ├── index.js          # Point d'entrée de l'API

│   └── package.json      # Dépendances et scripts
│
├── frontend/             # Application React

│   ├── public/           # Fichiers statiques

│   ├── src/              # Code source React

│   │   ├── components/   # Composants React

│   │   ├── App.js        # Composant principal

│   │   └── index.js      # Point d'entrée

│   ├── Dockerfile        # Configuration Docker pour le frontend

│   └── package.json      # Dépendances et scripts
│
├── .github/              # Configuration GitHub

│   └── workflows/        # Workflows GitHub Actions

│       └── ci.yml        # Pipeline CI/CD
│
├── docker-compose.yml    # Configuration Docker Compose

└── README.md             # Documentation


# Documentation de l'API

## Endpoints

### GET /api/matches

•	Description : Récupère tous les matches

•	Réponse : 200 OK avec un tableau des matches

### POST /api/matches

•	Description : Ajoute un nouveau match

•	Corps de la requête : { "equipe1": "string", "equipe2": "string", "score": "string", "date": "string" }

•	Réponse : 201 Created avec les détails du match créé

### PUT /api/matches/:id

•	Description : Met à jour un match existant

•	Paramètres : id - ID du match

•	Corps de la requête : { "equipe1": "string", "equipe2": "string", "score": "string", "date": "string" }

•	Réponse : 200 OK avec les détails du match mis à jour

### DELETE /api/matches/:id

•	Description : Supprime un match

•	Paramètres : id - ID du match

•	Réponse : 200 OK avec un message de confirmation


