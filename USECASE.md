# Diagramme UML – Use Case (Cas d'utilisation)

```mermaid

usecaseDiagram
  actor Utilisateur
  actor Administrateur

  Utilisateur --> (Consulter les catégories)
  Utilisateur --> (Consulter les articles)
  Utilisateur --> (Consulter les emplacements)

  Administrateur --> (Ajouter une catégorie)
  Administrateur --> (Modifier une catégorie)
  Administrateur --> (Supprimer une catégorie)
  Administrateur --> (Ajouter un article)
  Administrateur --> (Modifier un article)
  Administrateur --> (Supprimer un article)
  Administrateur --> (Ajouter un emplacement)
  Administrateur --> (Modifier un emplacement)
  Administrateur --> (Supprimer un emplacement)

  (Consulter les catégories) <.. (Ajouter une catégorie) : «include»
  (Consulter les articles) <.. (Ajouter un article) : «include»
  (Consulter les emplacements) <.. (Ajouter un emplacement) : «include»
```
