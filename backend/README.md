# SmartQuiz Backend

API REST Spring Boot 4 avec MongoDB pour la plateforme SmartQuiz.

## 🛠️ Stack

- **Java 21** (requis par Spring Boot 4)
- **Spring Boot 4.0**
- **Spring Data MongoDB**
- **Spring Security** (JWT Keycloak)
- **Gradle 8+** (Groovy DSL)
- **SpringDoc OpenAPI** (Swagger)

## 📁 Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/smartquiz/
│   │   │   ├── config/          # Configuration (Security, MongoDB, CORS)
│   │   │   ├── controller/      # REST Controllers
│   │   │   ├── service/         # Business Logic
│   │   │   ├── repository/      # MongoDB Repositories
│   │   │   ├── model/           # Entités MongoDB
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   └── exception/       # Custom Exceptions
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
├── docker/
│   └── Dockerfile
├── gradle/
│   └── wrapper/
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
└── README.md
```

## 🚀 Démarrage

### Prérequis
- **Java 21** (obligatoire pour Spring Boot 4)
- Gradle 8+ (ou utiliser le wrapper `./gradlew`)
- MongoDB Atlas ou local

### Développement

```bash
# Lancer avec le profil dev (security désactivée)
./gradlew bootRun --args='--spring.profiles.active=dev'

# Build
./gradlew build

# Tests unitaires
./gradlew test

# Tests d'intégration
./gradlew integrationTest

# Formater le code
./gradlew spotlessApply
```

### Variables d'environnement

```bash
MONGODB_URI=mongodb+srv://...
KEYCLOAK_ISSUER_URI=https://keycloak.example.com/realms/smartquiz
SECURITY_ENABLED=true
```

## 📖 API Documentation

Swagger UI disponible sur : `http://localhost:8080/swagger-ui.html`

## 🐳 Docker

```bash
# Build image
docker build -f docker/Dockerfile -t smartquiz-backend .

# Run
docker run -p 8080:8080 \
  -e MONGODB_URI=mongodb+srv://... \
  -e SECURITY_ENABLED=false \
  smartquiz-backend
```

## 🔐 Sécurité

- **Mode dev** : `app.security.enabled=false` → tous les endpoints sont publics
- **Mode prod** : `app.security.enabled=true` → JWT Keycloak requis

### Endpoints publics (même en mode prod)
- `GET /api/quizzes/**` - Catalogue de quiz
- `/actuator/health` - Health check
- `/swagger-ui/**` - Documentation API

