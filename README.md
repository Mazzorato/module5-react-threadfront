# Thread Fullstack

Application fullstack (style Twitter) avec posts et commentaires.

## Programme
React - SPA Réactive

## Prérequis
- Git (pour cloner le dépôt)
- Docker et Docker Compose (pour la version conteneurisée)
- Node.js et npm (pour la version locale)
- MySQL (pour la version locale)

## Installation des dépendances
```bash
cd back && npm install
cd ../thread-front && npm install
```

## Lancement de l'application

### En local
```bash
# Back
cd back && node app.mjs

# Front (dans un autre terminal)
cd thread-front && npm run dev
```
Ouvrir http://localhost:5173

### Avec Docker
```bash
docker compose up --build
```
Ouvrir http://localhost:8089

## Variables d'environnement
| Variable | Valeur par défaut |
|---|---|
| JWT_SECRET | *à définir* |
| MYSQL_DATABASE | Thread_database |
| MYSQL_ROOT_PASSWORD | root |

## Ports
| Service | Hôte | Conteneur |
|---------|------|-----------|
| Front   | 8089 | 80        |
| Back    | 3000 | 3000      |