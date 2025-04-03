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

Voici pourquoi chaque notion est associée à une route spécifique :

GET /articles – Controller & Interceptor (logging des réponses) :
La méthode findAll() sert à récupérer l'ensemble des articles. L'interceptor de logging est particulièrement utile ici pour observer le format et la durée de la réponse, ce qui est souvent moins critique en termes de sécurité mais très important pour le suivi et la performance.

GET /articles/:id – Controller, Pipes (validation et transformation) & Exception Filter :
Lorsqu'on récupère un article par son identifiant, il est essentiel de valider et de transformer ce paramètre (souvent passé en tant que chaîne) en un format attendu (par exemple, un nombre ou un UUID) avec les pipes. L'exception filter, quant à lui, permet de gérer le cas où l'article n'est pas trouvé en renvoyant une réponse uniforme et bien structurée.

POST /articles – Controller, Validation Pipe (DTO), Custom Decorator (@User()) & Exception Filter :
Pour la création d'un article, il faut s'assurer que les données envoyées respectent la structure définie par le DTO (via le Validation Pipe). L'ajout d'un custom decorator comme @User() permet d'obtenir automatiquement des informations sur l'utilisateur (souvent issus d'une simulation d'authentification ou d'un vrai mécanisme). L'exception filter gère les erreurs qui pourraient survenir lors de ce processus de création (par exemple, en cas de données manquantes ou incorrectes).

PUT /articles/:id – Controller, Pipes, Guard (authentification/autorisation) & Custom Decorator :
Lors d'une mise à jour d'article, il est crucial d'assurer que l'utilisateur a le droit de modifier cet article. Le guard protège la route en vérifiant l'authentification et potentiellement les droits (par exemple, en comparant l'utilisateur authentifié et l'owner de l'article). Les pipes permettent de valider la donnée en entrée et le custom decorator peut fournir des informations sur l'utilisateur pour faciliter cette vérification.

DELETE /articles/:id – Controller, Guard (sécurisation) & Exception Filter :
La suppression d'un article est une opération sensible. Le guard est donc essentiel pour empêcher toute suppression non autorisée. L'exception filter assure que, en cas d'erreur (par exemple, si l'article n'existe pas ou si l'utilisateur n'est pas autorisé), la réponse est formatée de manière cohérente et informative.
En associant ces notions à des routes spécifiques, le plan vous permet de :
Observer directement l'impact de chaque concept sur les comportements attendus (validation, sécurité, traitement des erreurs, logging).
Structurer progressivement votre API en implantant ces mécanismes dès les premiers endpoints, ce qui facilite la compréhension et le débogage.
Mettre en place une architecture modulaire où chaque route bénéficie des améliorations (sécurité, filtration ou transformation) qui correspondent à son rôle et à ses exigences opérationnelles.

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
