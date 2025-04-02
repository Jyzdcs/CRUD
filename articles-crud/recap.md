---
description:
globs:
alwaysApply: false
---

Ordre de réalisation

1. Configuration initiale : Installer Nest, configurer TypeORM, créer .env, etc.
2. Création de l’architecture du projet : Organiser les dossiers (articles, common pour Middleware, Pipes, Filters, etc.).
3. Implémenter le Middleware de logging dans common/middleware/logger.middleware.ts et l’enregistrer dans le fichier principal (via app.module.ts ou dans le main.ts).
4. Développer l’Exception Filter et l’appliquer de manière globale.
5. Mettre en place les Pipes de validation et créer les DTOs pour l’entité Article.
6. Implémenter le Guard Auth (même en simulant une authentification) et le custom decorator @User().
7. Créer le module Articles (articles.module.ts) avec son Controller et Service.
8. Définir les routes du Controller en y associant les appels au Service, en appliquant Guards, Pipes et en utilisant le custom decorator.
9. Ajouter les Interceptors : logging interceptor & timeout interceptor pour enrichir le comportement.
10. Tester chaque endpoint manuellement (ou via des tests unitaires) pour vérifier que chaque notion est opérationnelle.

Récapitulatif des routes et notion associées
| Route | Méthode | Service impliqué | Notions abordées |
|-------------------------|---------|-------------------------------|-------------------------------------------------------------|
| /articles | GET | findAll() | Controller, Interceptor (logging des réponses) |
| /articles/:id | GET | findOne(id) | Controller, Pipes (validation et transformation), Exception Filter (article non trouvé) |
| /articles | POST | create(createArticleDto) | Controller, Validation Pipe (DTO), Custom Decorator (@User()), Exception Filter |
| /articles/:id | PUT | update(id, updateArticleDto)| Controller, Pipes, Guard (authentification/autorisation), Custom Decorator |
| /articles/:id | DELETE | delete(id) | Controller, Guard (sécurisation), Exception Filter |

src/
├── app.module.ts
├── articles/ // Module Articles (CRUD)
│ ├── articles.module.ts
│ ├── articles.controller.ts
│ ├── articles.service.ts
│ ├── article.entity.ts
│ └── dto/
│ ├── create-article.dto.ts
│ └── update-article.dto.ts
├── common/ // Code partagé et notions transverses
│ ├── decorators/
│ │ └── user.decorator.ts // Custom decorator pour extraire l'user
│ ├── filters/
│ │ └── http-exception.filter.ts // Exception filter pour une gestion globale des erreurs HTTP
│ ├── guards/
│ │ └── auth.guard.ts // Guard personnalisé pour l’authentification/autorisation
│ ├── interceptors/
│ │ ├── logging.interceptor.ts // Exemple d’interceptor pour le logging
│ │ └── timeout.interceptor.ts // Interceptor pour la gestion des timeouts
│ └── middleware/
│ └── logger.middleware.ts // Middleware global de logging des requêtes entrantes
