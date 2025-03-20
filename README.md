# Oedika

**Oedika** est une application web progressive (PWA) développée dans le cadre d'un TP sur Docker. Elle utilise **VueJS** pour le frontend et **NodeJS** pour le backend. L'application permet de prendre des photos avec la caméra de l'utilisateur, de les stocker, et d'interagir avec une carte interactive.

---

## Table des matières
1. [Installation](#installation)
2. [Fonctionnalités](#fonctionnalités)
   - [Accueil](#accueil)
   - [Caméra](#caméra)
   - [Cartes](#cartes)
3. [Documentation technique](#documentation-technique)
   - [Choix technologiques](#choix-technologiques)
   - [Configuration Docker](#configuration-docker)

---

## Installation

Suivez ces étapes pour installer et exécuter le projet sur votre machine :

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/ClementDaguenet/M1-MDS-Docker-Oedika.git
   cd M1-MDS-Docker-Oedika
2. **Lancer l'application avec Docker Compose** :
   ```bash
   docker compose up --build
3. **Accéder à l'application** :
- Frontend : Ouvrir le navigateur sur http:localhost:8080.
- Backend : API disponible sur http:localhost:3000.
4. **Arrêter l'application** :
   ```bash
   docker compose down

## Fonctionnalités
### Accueil
- Une page d'accueil simple avec un menu burger en haut à gauche.
- La barre de navigation permet d'accéder aux différentes sections de l'application.

### Caméra
- Activation de la caméra de l'utilisateur (avec son accord).
- Prise de photos, qui déclenche une notification système.
- Stockage des photos dans une base de données.
- Affichage des photos précédentes dans un carrousel.

### Cartes
- Une carte interactive centrée sur la position actuelle de l'utilisateur.
- Recherche d'adresses et navigation vers celles-ci.

## Documentation technique
### Choix technologiques
**Frontend** :

- **VueJS** : Framework JavaScript moderne et réactif pour créer des interfaces utilisateur.
- **TypeScript** : Ajoute une typage statique pour une meilleure maintenabilité du code.
- **PWA** : L'application est une Progressive Web App, permettant une expérience utilisateur fluide et une installation hors ligne.

**Backend** :

- **NodeJS** : Environnement d'exécution JavaScript pour le serveur.
- **Express** : Framework pour créer des APIs RESTful.
- **SQLite** : Base de données légère et portable pour stocker les photos.

**Docker** :

- Utilisation de Docker pour conteneuriser l'application et simplifier son déploiement.
- Docker Compose pour orchestrer les conteneurs frontend et backend.

### Configuration Docker
**Frontend** :

- Basé sur une image nginx pour servir les fichiers statiques.
- Exposé sur le port 8080 de l'hôte.

**Backend** :

- Basé sur une image node:18.
- Exposé sur le port 3000 de l'hôte.
- Utilisation d'un volume Docker pour persister la base de données SQLite.

**Réseau** :

- Les conteneurs communiquent via un réseau Docker personnalisé (app-network).