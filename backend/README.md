# SmartQuiz Backend

API REST Spring Boot 4 avec MongoDB pour la plateforme SmartQuiz.

## 🛠️ Stack

- **Java 21+**
- **Spring Boot 4**
- **Spring Data MongoDB**
- **Spring Security** (JWT Keycloak)
- **Gradle** (Kotlin DSL)
- **SpringDoc OpenAPI** (Swagger)

## 📁 Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/smartquiz/
│   │   │   ├── config/          # Configuration (Security, MongoDB, CORS)
│   │   │   ├── controllers/     # REST Controllers
│   │   │   ├── services/        # Business Logic
│   │   │   ├── repositories/    # MongoDB Repositories
│   │   │   ├── models/          # Entités MongoDB
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   └── exceptions/      # Custom Exceptions
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-dev.yml
│   └── test/
├── build.gradle.kts
├── settings.gradle.kts
├── Dockerfile
└── README.md
```

## 🚀 Démarrage

### Prérequis
- Java 21+
- Gradle 8+
- MongoDB Atlas ou local

### Développement

```bash
# Lancer avec le profil dev
./gradlew bootRun --args='--spring.profiles.active=dev'

# Build
./gradlew build

# Tests
./gradlew test
```

### Variables d'environnement

```bash
MONGODB_URI=mongodb+srv://...
KEYCLOAK_ISSUER_URI=https://keycloak.example.com/realms/smartquiz
```

## 📖 API Documentation

Swagger UI disponible sur : `http://localhost:8080/swagger-ui.html`

## 🐳 Docker

```bash
# Build image
docker build -t smartquiz-backend .

# Run
docker run -p 8080:8080 -e MONGODB_URI=... smartquiz-backend
```
