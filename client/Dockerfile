# Utiliser une image Node.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Construire l'application React
RUN npm run build

# Installer un serveur HTTP (ex: serve)
RUN npm install -g serve

# Exposer le port
EXPOSE 3000

# Lancer l'application React en mode production
CMD ["serve", "-s", "build", "-l", "3000"]
