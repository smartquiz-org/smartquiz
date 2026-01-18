# SmartQuiz

Plateforme d'apprentissage interactive permettant aux utilisateurs de tester et améliorer leurs compétences techniques à travers des quiz personnalisés.

## 📁 Structure du projet

```
smartquiz/
├── backend/              # API Spring Boot 4 + MongoDB (Gradle)
├── frontend/             # Application Angular 20+ SSR
├── .github/workflows/    # CI/CD GitHub Actions
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🏗️ Stack technique

### Frontend (`/frontend`)
- **Framework** : Angular 20+ avec SSR (Server-Side Rendering)
- **State Management** : Signals (pas de NgRx)
- **Styling** : TailwindCSS + Dark/Light themes
- **Icons** : Lucide Icons
- **Components** : Standalone Components
- **Build** : Angular CLI

### Backend (`/backend`)
- **Runtime** : Java 21 (requis par Spring Boot 4)
- **Framework** : Spring Boot 4.0
- **Build** : Gradle 8+ (Groovy DSL)
- **Database** : MongoDB Atlas
- **Security** : Spring Security + JWT (Keycloak)
- **Documentation** : SpringDoc OpenAPI (Swagger)

### Infrastructure
- **Serveur** : Oracle Linux ARM (bare metal)
- **Containerisation** : Docker Compose
- **Reverse Proxy** : Traefik (SSL automatique)
- **CI/CD** : GitHub Actions

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- **Java 21** (obligatoire pour Spring Boot 4)
- Docker & Docker Compose
- MongoDB Atlas account (ou MongoDB local)

### Développement local

```bash
# Frontend
cd frontend
npm install
npm run start

# Backend
cd backend
./gradlew bootRun --args='--spring.profiles.active=dev'
```

### Docker

```bash
docker-compose up -d
```

## 📋 Fonctionnalités MVP

- ✅ Catalogue de quiz (recherche, filtres)
- ✅ Passage de quiz (QCM, Vrai/Faux, Image)
- ✅ Modes : Entraînement (feedback immédiat) / Examen (chronométré)
- ✅ Sauvegarde automatique et reprise de session
- ✅ Résultats détaillés avec explications
- ✅ Dashboard personnel
- ✅ Historique des tentatives

## 📖 Documentation

Voir le repository [smartquiz-specifications](https://github.com/smartquiz-org/smartquiz-specifications) pour :
- Spécifications fonctionnelles complètes
- User stories et backlog
- Architecture technique détaillée
- Design system

## 🔗 Liens

- **Specifications** : https://github.com/smartquiz-org/smartquiz-specifications
- **Organisation** : https://github.com/smartquiz-org

## 📄 License

MIT
