# Utiliser une image Node.js légère
FROM node:alpine  

# Définir le répertoire de travail
WORKDIR /app  

# Copier les fichiers nécessaires
COPY package*.json ./  

# Installer les dépendances
RUN npm install  

# Copier le reste des fichiers
COPY . .  

# Exposer le port du backend
EXPOSE 5000  

# Démarrer l'application
CMD ["node", "index.js"]
